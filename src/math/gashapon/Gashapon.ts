import { IGashapon, IConfig, IState, Mode, ModeString, ItemType, RNDObjType } from './IGashapon';
import { Clone } from '../../utils/object/Clone';
import { IsEmpty } from '../../utils/object/IsEmpty';
import { Clear } from '../../utils/object/Clear';

/**
 * Pick a random item from box.
 *
 * @export
 * @class Gashapon
 * @implements {IGashapon}
 */
export class Gashapon implements IGashapon {

    mode: Mode;
    items: ItemType;
    remainder: ItemType;
    reload: boolean;
    rnd: RNDObjType | undefined;
    result: string | null;

    private _restartFlag: boolean;
    private _list: [string, number][];

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
    constructor({
        mode = Mode.shuffle,
        reload = true,
        items = {},
        rnd = undefined
    }: IConfig = {}) {

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
    fromJSON({
        mode = Mode.shuffle,
        reload = true,
        items = {},
        result = null,
        remainder = undefined,
        rnd = undefined
    }: IState = {}): this {

        this.setMode(mode);
        this.setReload(reload);
        this.setRND(rnd);

        // Data
        this.items = Clone(items, this.items) as ItemType;
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
            this.remainder = Clone(remainder, this.remainder) as ItemType;
        }

        return this;
    }

    /**
     * Get state.
     *
     * @returns {IState}
     * @memberof Gashapon
     */
    toJSON(): IState {
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
    };

    /**
     * Set pick mode.
     *
     * @param {(Mode | ModeString)} m Pick mode, put item back to box or not.
     * @returns {this}
     * @memberof Gashapon
     */
    setMode(m: Mode | ModeString): this {

        if (typeof (m) === 'string') {
            m = Mode[m] as number;
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
    setReload(isReload: boolean = true): this {

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
    setRND(rnd?: RNDObjType): this {

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
    setItem(
        name: string,
        count: number
    ): this {

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
    setItems(items: ItemType = {}): this {

        this.items = Clone(items, this.items) as ItemType;
        return this;
    }

    /**
     * Remove a candidate item.
     *
     * @param {string} name Item name.
     * @returns {this}
     * @memberof Gashapon
     */
    removeItem(name: string): this {

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
    removeAllItems(): this {

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
    addItem(
        name: string,
        count: number = 1
    ): this {

        if (!this.items.hasOwnProperty(name)) {
            this.items[name] = 0;
        }
        this.items[name] += count;

        if (this._restartFlag) {
            return this;
        }

        if (this.mode === Mode.shuffle) {
            this.addRemainItem(name, count);
        } else { // ??
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
    putItemBack(
        name: string,
        count: number = 1
    ): this {

        if (this.mode === Mode.random) {
            return this;
        } else if ( // Shuffle mode
            this._restartFlag ||
            (!this.items.hasOwnProperty(name))
        ) {
            return this;
        }

        // Generator had started
        if (!this.remainder.hasOwnProperty(name)) {
            this.remainder[name] = 0;
        }

        this.addRemainItem(name, count, this.items[name]);
        return this;
    };

    /**
     * Pick a item.
     *
     * @param {string} [name] If this name is undefined, pick a random item, else pick a item with this name.
     * @returns {(string | null)} Item name if picked, else null.
     * @memberof Gashapon
     */
    next(
        name?: string
    ): string | null {

        let result = null;
        if (this._restartFlag) {
            this.startGen();
        }

        if (name === undefined) {
            if (this.mode === Mode.shuffle) {
                this.resetItemList(this.remainder);
                result = this.getRndItem(this._list);
                this.addRemainItem(result, -1);
            } else { // random mode
                result = this.getRndItem(this._list);
            }

        } else { // Force picking
            if (!this.remainder.hasOwnProperty(name)) {
                result = null; // Can not pick that result
            } else {
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
    getItems(): ItemType {

        return this.items;
    }

    /**
     * Get all remainder items in box.
     *
     * @returns {ItemType} Remainder items in box.
     * @memberof Gashapon
     */
    getRemain(): ItemType {

        return this.remainder
    }

    /**
     * Get amount of a candidate item.
     *
     * @param {string} name Item name.
     * @returns {number} Amount of a candidate item.
     * @memberof Gashapon
     */
    getItemCount(name: string): number {

        if (this.items.hasOwnProperty(name)) {
            return this.items[name];
        } else {
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
    getRemainCount(name: string): number {

        if (this.remainder.hasOwnProperty(name)) {
            return this.remainder[name];
        } else {
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
    forEachItem(
        callback: (name: string, count: number) => boolean | undefined,
        scope?: object
    ): this {

        let items = this.items;
        for (let name in items) {
            let breakLoop;
            if (scope) {
                breakLoop = callback.call(scope, name, items[name]);
            } else {
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
    forEachRemain(
        callback: (name: string, count: number) => boolean | undefined,
        scope?: object
    ): this {

        let items = this.remainder;
        for (let name in items) {
            let breakLoop;
            if (scope) {
                breakLoop = callback.call(scope, name, items[name]);
            } else {
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

    private startGen(): this {

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

    private resetItemList(
        items: ItemType
    ): this {

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

    private addRemainItem(
        name: string,
        inc: number = 1,
        maxCount?: number
    ): this {

        if (inc === 0) {
            return this;
        }

        if (!this.remainder.hasOwnProperty(name)) {
            this.remainder[name] = 0;
        }

        this.remainder[name] += inc;
        if ((maxCount !== undefined) && (this.remainder[name] > maxCount)) {
            this.remainder[name] = maxCount
        }

        if (this.remainder[name] <= 0) {
            delete this.remainder[name];
        }

        if ((this.mode === Mode.shuffle) && this.reload && IsEmpty(this.remainder)) {
            this._restartFlag = true;
        }

        return this;
    }

    private getRndItem(
        list: [string, number][]
    ): string {

        let value = (this.rnd) ? this.rnd.frac() : Math.random();
        let result = null,
            item: [string, number];
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