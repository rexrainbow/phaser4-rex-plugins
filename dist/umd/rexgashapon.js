(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.rexgashapon = {}));
}(this, (function (exports) { 'use strict';

    /**
     * Pick mode, put item back to box or not.
     *
     * @export
     * @enum {number}
     */
    var Mode;
    (function (Mode) {
        /**
         * Don't put item back to box after pick it.
         */
        Mode[Mode["shuffle"] = 0] = "shuffle";
        /**
         * Put item back to box after pick it.
         */
        Mode[Mode["random"] = 1] = "random";
    })(Mode || (Mode = {}));

    /**
     * Clear all items of an array, or all properties of an object
     *
     * @param {(any[] | { [name: string]: any })} obj
     */
    function Clear(obj) {
        if (Array.isArray(obj)) {
            obj.length = 0;
        }
        else {
            for (let key in obj) {
                delete obj[key];
            }
        }
    }

    /**
     * Clone all items of an array, or all properties of an object
     *
     * @param {(any[] | { [name: string]: any })} obj
     * @param {(any[] | { [name: string]: any })} [out]
     * @returns {(any[] | { [name: string]: any })}
     */
    function Clone(obj, out) {
        var objIsArray = Array.isArray(obj);
        if (out === undefined) {
            out = (objIsArray) ? [] : {};
        }
        else {
            Clear(out);
        }
        if (objIsArray) {
            out.length = obj.length;
            for (let i = 0, cnt = obj.length; i < cnt; i++) {
                out[i] = obj[i];
            }
        }
        else {
            for (let key in obj) {
                out[key] = obj[key];
            }
        }
        return out;
    }

    /**
     * Is an array empty, or an object has no property?
     *
     * @param {(any[] | { [name: string]: any })} obj
     * @returns {boolean}
     */
    function IsEmpty(obj) {
        if (Array.isArray(obj)) {
            return (obj.length === 0);
        }
        else {
            for (let k in obj) {
                return false;
            }
            return true;
        }
    }

    /**
     * Pick a random item from box.
     *
     * @export
     * @class Gashapon
     * @implements {IGashapon}
     */
    class Gashapon {
        /**
         * Creates an instance of Gashapon.
         * @param {IConfig} [{
         *         mode = Mode.shuffle,
         *         reload = true,
         *         items = {},
         *         rnd = undefined
         *     }={}]
         * @memberof Gashapon
         */
        constructor({ mode = Mode.shuffle, reload = true, items = {}, rnd = undefined } = {}) {
            this.items = {};
            this.remainder = {};
            this._list = [];
            this.result = null;
            this.setMode(mode);
            this.setReload(reload);
            this.setRND(rnd);
            Object.assign(this.items, items);
        }
        /**
         * Reset state.
         *
         * @param {IState} [{
         *         mode = Mode.shuffle,
         *         reload = true,
         *         items = {},
         *         result = null,
         *         remainder = undefined,
         *         rnd = undefined
         *     }={}]
         * @returns {this}
         * @memberof Gashapon
         */
        fromJSON({ mode = Mode.shuffle, reload = true, items = {}, result = null, remainder = undefined, rnd = undefined } = {}) {
            this.setMode(mode);
            this.setReload(reload);
            this.setRND(rnd);
            // Data
            this.items = Clone(items, this.items);
            this._list.length = 0;
            // Result
            this.result = result;
            // Flags
            this._restartFlag = true; // force restart to rebuild this._list
            // Initialize
            if (this._restartFlag) {
                this.startGen();
            }
            if (remainder) {
                this.remainder = Clone(remainder, this.remainder);
            }
            return this;
        }
        /**
         * Get state.
         *
         * @returns {IState}
         * @memberof Gashapon
         */
        toJSON() {
            return {
                // Configuration
                mode: this.mode,
                reload: this.reload,
                rnd: this.rnd,
                // Data
                items: this.items,
                remainder: this.remainder,
                // Result
                result: this.result
            };
        }
        ;
        /**
         * Set pick mode.
         *
         * @param {(Mode | ModeString)} m Pick mode, put item back to box or not.
         * @returns {this}
         * @memberof Gashapon
         */
        setMode(m) {
            if (typeof (m) === 'string') {
                m = Mode[m];
            }
            if (this.mode === m) {
                return this;
            }
            this.mode = m;
            this._restartFlag = true;
            return this;
        }
        /**
         * Set reload.
         *
         * @param {boolean} [isReload=true] Set true to reload candidate items when box is empty.
         * @returns {this}
         * @memberof Gashapon
         */
        setReload(isReload = true) {
            this.reload = isReload;
            return this;
        }
        /**
         * Set custom random number generator.
         *
         * @param {RNDObjType} [rnd] Custom random number generator.
         * @returns {this}
         * @memberof Gashapon
         */
        setRND(rnd) {
            this.rnd = rnd;
            return this;
        }
        /**
         * Set a candidate item.
         *
         * @param {string} name Item name.
         * @param {number} count Amount of this item.
         * @returns {this}
         * @memberof Gashapon
         */
        setItem(name, count) {
            if (this.items[name] === count) {
                return this;
            }
            this.items[name] = count;
            this._restartFlag = true;
            return this;
        }
        /**
         * Set candidate items.
         *
         * @param {ItemType} [items={}] Candidate items.
         * @returns {this}
         * @memberof Gashapon
         */
        setItems(items = {}) {
            this.items = Clone(items, this.items);
            return this;
        }
        /**
         * Remove a candidate item.
         *
         * @param {string} name Item name.
         * @returns {this}
         * @memberof Gashapon
         */
        removeItem(name) {
            if (!this.items.hasOwnProperty(name)) {
                return this;
            }
            delete this.items[name];
            this._restartFlag = true;
            return this;
        }
        /**
         * Clear all candidate items.
         *
         * @returns {this}
         * @memberof Gashapon
         */
        removeAllItems() {
            Clear(this.items);
            this._restartFlag = true;
            return this;
        }
        /**
         * Add some candidate items.
         *
         * @param {string} name Item name.
         * @param {number} [count=1] Amount of item.
         * @returns {this}
         * @memberof Gashapon
         */
        addItem(name, count = 1) {
            if (!this.items.hasOwnProperty(name)) {
                this.items[name] = 0;
            }
            this.items[name] += count;
            if (this._restartFlag) {
                return this;
            }
            if (this.mode === Mode.shuffle) {
                this.addRemainItem(name, count);
            }
            else { // ??
                this.resetItemList(this.remainder);
            }
            return this;
        }
        /**
         * Put item back from box.
         *
         * @param {string} name
         * @param {number} [count=1]
         * @returns {this}
         * @memberof Gashapon
         */
        putItemBack(name, count = 1) {
            if (this.mode === Mode.random) {
                return this;
            }
            else if ( // Shuffle mode
            this._restartFlag ||
                (!this.items.hasOwnProperty(name))) {
                return this;
            }
            // Generator had started
            if (!this.remainder.hasOwnProperty(name)) {
                this.remainder[name] = 0;
            }
            this.addRemainItem(name, count, this.items[name]);
            return this;
        }
        ;
        /**
         * Pick a item.
         *
         * @param {string} [name] If this name is undefined, pick a random item, else pick a item with this name.
         * @returns {(string | null)} Item name if picked, else null.
         * @memberof Gashapon
         */
        next(name) {
            let result = null;
            if (this._restartFlag) {
                this.startGen();
            }
            if (name === undefined) {
                if (this.mode === Mode.shuffle) {
                    this.resetItemList(this.remainder);
                    result = this.getRndItem(this._list);
                    this.addRemainItem(result, -1);
                }
                else { // random mode
                    result = this.getRndItem(this._list);
                }
            }
            else { // Force picking
                if (!this.remainder.hasOwnProperty(name)) {
                    result = null; // Can not pick that result
                }
                else {
                    result = name;
                    if (this.mode === Mode.shuffle) {
                        this.addRemainItem(name, -1);
                    }
                }
            }
            this.result = result;
            return result;
        }
        /**
         * Get all candidate items.
         *
         * @returns {ItemType} Candidate items.
         * @memberof Gashapon
         */
        getItems() {
            return this.items;
        }
        /**
         * Get all remainder items in box.
         *
         * @returns {ItemType} Remainder items in box.
         * @memberof Gashapon
         */
        getRemain() {
            return this.remainder;
        }
        /**
         * Get amount of a candidate item.
         *
         * @param {string} name Item name.
         * @returns {number} Amount of a candidate item.
         * @memberof Gashapon
         */
        getItemCount(name) {
            if (this.items.hasOwnProperty(name)) {
                return this.items[name];
            }
            else {
                return 0;
            }
        }
        /**
         * Get amount of a remainder item in box.
         *
         * @param {string} name Item name.
         * @returns {number} Amount of a remainder item in box.
         * @memberof Gashapon
         */
        getRemainCount(name) {
            if (this.remainder.hasOwnProperty(name)) {
                return this.remainder[name];
            }
            else {
                return 0;
            }
        }
        /**
         * For each candidate item.
         *
         * @param {((name: string, count: number) => boolean | undefined)} callback
         * @param {object} [scope]
         * @returns {this}
         * @memberof Gashapon
         */
        forEachItem(callback, scope) {
            let items = this.items;
            for (let name in items) {
                let breakLoop;
                if (scope) {
                    breakLoop = callback.call(scope, name, items[name]);
                }
                else {
                    breakLoop = callback(name, items[name]);
                }
                if (breakLoop) {
                    break;
                }
            }
            return this;
        }
        /**
         * For each remainder item in box.
         *
         * @param {((name: string, count: number) => boolean | undefined)} callback
         * @param {object} [scope]
         * @returns {this}
         * @memberof Gashapon
         */
        forEachRemain(callback, scope) {
            let items = this.remainder;
            for (let name in items) {
                let breakLoop;
                if (scope) {
                    breakLoop = callback.call(scope, name, items[name]);
                }
                else {
                    breakLoop = callback(name, items[name]);
                }
                if (breakLoop) {
                    break;
                }
            }
            return this;
        }
        /**
         * Destroy this instance.
         *
         * @memberof Gashapon
         */
        destroy() {
            // data
            Clear(this.items);
            Clear(this.remainder);
            Clear(this._list);
            // result
            this.result = null;
            // flags
            this._restartFlag = false;
        }
        startGen() {
            // Clear remainder items
            for (let name in this.remainder) {
                if (!this.items.hasOwnProperty(name)) {
                    delete this.remainder[name];
                }
            }
            // Init remainder items
            for (let name in this.items) {
                let count = this.items[name];
                if (count > 0) {
                    this.remainder[name] = count;
                }
            }
            if (this.mode === Mode.random) {
                this.resetItemList(this.remainder);
            }
            this._restartFlag = false;
            return this;
        }
        resetItemList(items) {
            // Clear list
            this._list.length = 0;
            let totalCount = 0;
            // Get total count
            for (let name in items) {
                let count = items[name];
                if (count > 0) {
                    totalCount += count;
                }
            }
            // Set percentage
            for (let name in items) {
                let count = items[name];
                if (count > 0) {
                    this._list.push([
                        name,
                        (count / totalCount)
                    ]);
                }
            }
            return this;
        }
        addRemainItem(name, inc = 1, maxCount) {
            if (inc === 0) {
                return this;
            }
            if (!this.remainder.hasOwnProperty(name)) {
                this.remainder[name] = 0;
            }
            this.remainder[name] += inc;
            if ((maxCount !== undefined) && (this.remainder[name] > maxCount)) {
                this.remainder[name] = maxCount;
            }
            if (this.remainder[name] <= 0) {
                delete this.remainder[name];
            }
            if ((this.mode === Mode.shuffle) && this.reload && IsEmpty(this.remainder)) {
                this._restartFlag = true;
            }
            return this;
        }
        getRndItem(list) {
            let value = (this.rnd) ? this.rnd.frac() : Math.random();
            let result = null, item;
            for (let i = 0, cnt = list.length; i < cnt; i++) {
                item = list[i];
                value -= item[1];
                if (value < 0) {
                    result = item[0];
                    break;
                }
            }
            return result;
        }
    }

    exports.Gashapon = Gashapon;

})));
//# sourceMappingURL=rexgashapon.js.map
