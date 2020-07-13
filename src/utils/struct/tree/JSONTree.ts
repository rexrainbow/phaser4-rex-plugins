import { SetValue } from '../../object/SetValue';
import { Clear } from '../../object/Clear';
import { DeepClone } from '../../object/DeepClone';
import { ITree, DataType, ValueType } from './ITree';

export { DataType, ValueType };

export class JSONTree implements ITree {
    data: DataType;

    constructor() {
        this.data = {};
    }

    setValue(
        keys?: string | DataType,
        value?: unknown
    ): this {

        if (keys == null) {
            this.clear(); // No argument
        } else if (typeof (keys) === 'object') {
            this.data = keys; // JSON keys
        } else {
            SetValue(this.data, keys, value);
        }
        return this;
    }

    getValue(
        keys?: string | string[]
    ): ValueType {

        if (keys == null) {
            return this.data;
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            let entry: ValueType = this.data;
            for (let i = 0, cnt = keys.length; i < cnt; i++) {
                if (!IsObject(entry)) {
                    return undefined;
                }
                entry = entry[keys[i]];
            }
            return entry;
        }
    }

    cloneValue(
        keys?: string | string[]
    ): ValueType {

        return DeepClone<ValueType>(this.getValue(keys));
    }

    removeKey(
        keys?: string | string[]
    ): this {

        if (keys == null) {
            this.clear();
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            let lastKey = keys.pop();
            let entry: ValueType = this.data;
            for (let i = 0, cnt = keys.length; i < cnt; i++) {
                if (!IsObject(entry)) {
                    // Stop here
                    return this;
                }
                entry = entry[keys[i]];
            }

            if (IsObject(entry)) {
                delete entry[lastKey];
            }
        }

        return this;
    }

    clear(): this {
        Clear(this.data);
        return this;
    }
}

let IsObject = function (obj: unknown) {

    return (obj != null) && (typeof (obj) === 'object')
}