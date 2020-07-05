import { IGashapon, IConfig, IState, Mode, ModeString, ItemType, ItemMapType, RNDObjType } from './IGashapon';
import { ObjToMap } from '../../utils/map/ObjToMap';
import { MapToObj } from '../../utils/map/MapToObj';

/**
 * Pick a random item from box.
 *
 * @export
 * @class Gashapon
 * @implements {IGashapon}
 */
export class Gashapon implements IGashapon {

    mode: Mode;
    items: ItemMapType;
    remainder: ItemMapType;
    reload: boolean;
    rnd: RNDObjType | undefined;
    result: string | null;


    private _restartFlag: boolean;
    private _totalRemainderCount: number | null;

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
    toJSON(): IState {
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

        if (this.items.get(name) === count) {
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
    setItems(items: ItemType = {}): this {

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
    removeItem(name: string): this {

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
    removeAllItems(): this {

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
    addItem(
        name: string,
        count: number = 1
    ): this {

        let prevValue = this.items.get(name) || 0;
        this.items.set(name, prevValue + count);

        if (this._restartFlag) {
            return this;
        }

        if (this.mode === Mode.shuffle) {
            this.addRemainItem(name, count);
        } else { // Mode.random
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
    putItemBack(
        name: string,
        count: number = 1
    ): this {

        if (this.mode === Mode.random) {
            return this;
        } else if ( // Shuffle mode
            this._restartFlag ||
            (!this.items.has(name))
        ) {
            return this;
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
                this._totalRemainderCount = null;
                result = this.getRndItem();
                this.addRemainItem(result, -1);
            } else { // random mode
                result = this.getRndItem();
            }

        } else { // Force picking
            if (!this.remainder.has(name)) {
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

        return MapToObj(this.items);
    }

    /**
     * Get all remainder items in box.
     *
     * @returns {ItemType} Remainder items in box.
     * @memberof Gashapon
     */
    getRemain(): ItemType {

        return MapToObj(this.remainder);
    }

    /**
     * Get amount of a candidate item.
     *
     * @param {string} name Item name.
     * @returns {number} Amount of a candidate item.
     * @memberof Gashapon
     */
    getItemCount(name: string): number {

        return this.items.get(name) || 0;
    }

    /**
     * Get amount of a remainder item in box.
     *
     * @param {string} name Item name.
     * @returns {number} Amount of a remainder item in box.
     * @memberof Gashapon
     */
    getRemainCount(name: string): number {

        return this.remainder.get(name) || 0;
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
        callback: (count: number, name: string) => boolean | undefined,
        scope?: object
    ): this {

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
    forEachRemain(
        callback: (count: number, name: string) => boolean | undefined,
        scope?: object
    ): this {

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

    private startGen(): this {

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

    private addRemainItem(
        name: string,
        inc: number = 1,
        maxCount?: number
    ): this {

        if (inc === 0) {
            return this;
        }

        let prevValue = this.remainder.get(name) || 0,
            newValue = prevValue + inc;
        if ((maxCount !== undefined) && (newValue > maxCount)) {
            newValue = maxCount;
        }

        if (newValue > 0) {
            this.remainder.set(name, newValue);
        } else {
            this.remainder.delete(name);
        }

        if ((this.mode === Mode.shuffle) && this.reload &&
            (this.remainder.size === 0)) {
            this._restartFlag = true;
        }

        return this;
    }

    private getRndItem(): string {

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

let GetTotalItemCount = function (items: ItemMapType) {
    let result = 0;
    for (const [name, count] of items) {
        result += count;
    }
    return result;
}