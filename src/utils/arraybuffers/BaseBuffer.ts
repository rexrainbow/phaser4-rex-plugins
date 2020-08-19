import { IBuffer } from './IBuffer';

export enum DataType {
    uint8 = 0,
    unit32 = 1
}

const ArrayClass = [Uint8Array, Uint32Array];
const ByteLength = [1, 4];

export class BaseBuffer implements IBuffer {
    type: DataType;

    _arr: Uint8Array | Uint32Array;
    _buf: ArrayBuffer;
    _rows: number;

    constructor(
        type: DataType,
        size: number = 0
    ) {

        this.type = type;
        this.resize(size);
    }

    get(
        offset: number
    ): number {

        return this._arr[offset];
    }

    set(
        offset: number,
        value: number
    ): this {

        this._arr[offset] = value;
        return this;
    }

    fill(
        value: number
    ): this {

        for (var i = 0, cnt = this._rows; i < cnt; i++) {
            this._arr[i] = value;
        }
        return this;
    }

    resize(
        size: number
    ): this {

        if (size !== this._rows) {
            this._rows = size;
            this._buf = new ArrayBuffer(this._rows * ByteLength[this.type]);
            this._arr = new (ArrayClass[this.type])(this._buf);
        }
        return this;
    }
}