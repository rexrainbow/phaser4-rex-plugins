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

    let ObjToMap = function (obj, out = new Map) {
        for (let key in obj) {
            out.set(key, obj[key]);
        }
        return out;
    };

    let MapToObj = function (map, out = {}) {
        map.forEach((value, key) => (out[key] = value));
        return out;
    };

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
            this.items = new Map();
            this.remainder = new Map();
            this._totalRemainderCount = null;
            this.result = null;
            this.setMode(mode);
            this.setReload(reload);
            this.setRND(rnd);
            this.setItems(items);
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
            this.setItems(items);
            this._totalRemainderCount = null;
            // Result
            this.result = result;
            // Flags
            this._restartFlag = true; // force restart to rebuild this._list
            // Initialize
            if (this._restartFlag) {
                this.startGen();
            }
            if (remainder) {
                this.remainder.clear();
                ObjToMap(remainder, this.remainder);
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
                items: MapToObj(this.items),
                remainder: MapToObj(this.remainder),
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
            if (this.items.has(name) && (this.items.get(name) === count)) {
                return this;
            }
            this.items.set(name, count);
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
            this.items.clear();
            ObjToMap(items, this.items);
            this._restartFlag = true;
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
            if (!this.items.has(name)) {
                return this;
            }
            this.items.delete(name);
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
            this.items.clear();
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
            if (this.items.has(name)) {
                this.items.set(name, this.items.get(name) + count);
            }
            else {
                this.items.set(name, count);
            }
            if (this._restartFlag) {
                return this;
            }
            if (this.mode === Mode.shuffle) {
                this.addRemainItem(name, count);
            }
            else { // Mode.random
                this._totalRemainderCount = null;
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
                (!this.items.has(name))) {
                return this;
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
                    this._totalRemainderCount = null;
                    result = this.getRndItem();
                    this.addRemainItem(result, -1);
                }
                else { // random mode
                    result = this.getRndItem();
                }
            }
            else { // Force picking
                if (!this.remainder.has(name)) {
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
            return MapToObj(this.items);
        }
        /**
         * Get all remainder items in box.
         *
         * @returns {ItemType} Remainder items in box.
         * @memberof Gashapon
         */
        getRemain() {
            return MapToObj(this.remainder);
        }
        /**
         * Get amount of a candidate item.
         *
         * @param {string} name Item name.
         * @returns {number} Amount of a candidate item.
         * @memberof Gashapon
         */
        getItemCount(name) {
            if (this.items.has(name)) {
                return this.items.get(name);
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
            if (this.remainder.has(name)) {
                return this.remainder.get(name);
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
            this.items.forEach(callback, scope);
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
            this.remainder.forEach(callback, scope);
            return this;
        }
        /**
         * Destroy this instance.
         *
         * @memberof Gashapon
         */
        destroy() {
            // data
            this.items.clear();
            this.remainder.clear();
            // result
            this.result = null;
            // flags
            this._restartFlag = false;
        }
        get totalRemainderCount() {
            if (this._totalRemainderCount === null) {
                this._totalRemainderCount = GetTotalItemCount(this.remainder);
            }
            return this._totalRemainderCount;
        }
        startGen() {
            this.remainder.clear();
            for (const [name, count] of this.items) {
                if (count > 0) {
                    this.remainder.set(name, count);
                }
            }
            if (this.mode === Mode.random) {
                this._totalRemainderCount = null;
            }
            this._restartFlag = false;
            return this;
        }
        addRemainItem(name, inc = 1, maxCount) {
            if (inc === 0) {
                return this;
            }
            var prevValue, newValue;
            if (!this.remainder.has(name)) {
                prevValue = 0;
            }
            else {
                prevValue = this.remainder.get(name);
            }
            newValue = prevValue + inc;
            if ((maxCount !== undefined) && (newValue > maxCount)) {
                newValue = maxCount;
            }
            if (newValue > 0) {
                this.remainder.set(name, newValue);
            }
            else {
                this.remainder.delete(name);
            }
            if ((this.mode === Mode.shuffle) && this.reload &&
                (this.remainder.size === 0)) {
                this._restartFlag = true;
            }
            return this;
        }
        getRndItem() {
            let result = null;
            let p = (this.rnd) ? this.rnd.frac() : Math.random();
            let totalCount = p * this.totalRemainderCount;
            for (const [name, count] of this.remainder) {
                totalCount -= count;
                if (totalCount <= 0) {
                    result = name;
                    break;
                }
            }
            return result;
        }
    }
    let GetTotalItemCount = function (items) {
        let result = 0;
        for (const [name, count] of items) {
            result += count;
        }
        return result;
    };

    exports.Gashapon = Gashapon;

})));
//# sourceMappingURL=rexgashapon.js.map
