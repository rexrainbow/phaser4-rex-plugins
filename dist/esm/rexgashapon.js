var Mode;
(function (Mode) {
    Mode[Mode["shuffle"] = 0] = "shuffle";
    Mode[Mode["random"] = 1] = "random";
})(Mode || (Mode = {}));

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

class Gashapon {
    constructor(config = {}) {
        let mode, reload, items, rnd;
        ({
            mode = Mode.shuffle,
            reload = true,
            items = {},
            rnd = undefined
        } = config);
        this.items = {};
        this.remainder = {};
        this._list = [];
        this.result = null;
        this.setMode(mode);
        this.setReload(reload);
        this.setRND(rnd);
        Object.assign(this.items, items);
    }
    fromJSON({ mode = Mode.shuffle, reload = true, items = {}, result = null, remainder = undefined, rnd = undefined }) {
        this.setMode(mode);
        this.setReload(reload);
        this.setRND(rnd);
        this.items = Clone(items, this.items);
        this._list.length = 0;
        this.result = result;
        this._restartFlag = true;
        if (this._restartFlag) {
            this.startGen();
        }
        if (remainder) {
            this.remainder = Clone(remainder, this.remainder);
        }
        return this;
    }
    toJSON() {
        return {
            mode: this.mode,
            reload: this.reload,
            rnd: this.rnd,
            items: this.items,
            remainder: this.remainder,
            result: this.result
        };
    }
    ;
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
    setReload(isReload = true) {
        this.reload = isReload;
        return this;
    }
    setRND(rnd) {
        this.rnd = rnd;
        return this;
    }
    setItem(name, count) {
        if (this.items[name] === count) {
            return this;
        }
        this.items[name] = count;
        this._restartFlag = true;
        return this;
    }
    setItems(items = {}) {
        this.items = Clone(items, this.items);
        return this;
    }
    removeItem(name) {
        if (!this.items.hasOwnProperty(name)) {
            return this;
        }
        delete this.items[name];
        this._restartFlag = true;
        return this;
    }
    removeAllItems() {
        Clear(this.items);
        this._restartFlag = true;
        return this;
    }
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
        else {
            this.resetItemList(this.remainder);
        }
        return this;
    }
    putItemBack(name, count = 1) {
        if (this.mode === Mode.random) {
            return this;
        }
        else if (this._restartFlag ||
            (!this.items.hasOwnProperty(name))) {
            return this;
        }
        if (!this.remainder.hasOwnProperty(name)) {
            this.remainder[name] = 0;
        }
        this.addRemainItem(name, count, this.items[name]);
        return this;
    }
    ;
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
            else {
                result = this.getRndItem(this._list);
            }
        }
        else {
            if (!this.remainder.hasOwnProperty(name)) {
                result = null;
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
    getItems() {
        return this.items;
    }
    getRemain() {
        return this.remainder;
    }
    getItemCount(name) {
        if (this.items.hasOwnProperty(name)) {
            return this.items[name];
        }
        else {
            return 0;
        }
    }
    getRemainCount(name) {
        if (this.remainder.hasOwnProperty(name)) {
            return this.remainder[name];
        }
        else {
            return 0;
        }
    }
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
    destroy() {
        Clear(this.items);
        Clear(this.remainder);
        Clear(this._list);
        this.result = null;
        this._restartFlag = false;
    }
    startGen() {
        for (let name in this.remainder) {
            if (!this.items.hasOwnProperty(name)) {
                delete this.remainder[name];
            }
        }
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
        this._list.length = 0;
        let totalCount = 0;
        for (let name in items) {
            let count = items[name];
            if (count > 0) {
                totalCount += count;
            }
        }
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

export { Gashapon };
