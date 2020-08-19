import { BaseBuffer, DataType } from './BaseBuffer';

const COLS = 8;
const SHIFT = 3;

export class BitBuffer extends BaseBuffer {

    constructor(size: number = 0) {
        super(DataType.uint8, size);
    }

    get(
        offset: number
    ): 0 | 1 {

        const row = offset >> SHIFT;
        const col = offset % COLS;
        const bit = 1 << col;
        return (this._arr[row] & bit) ? 1 : 0;
    }

    set(
        offset: number,
        value: 0 | 1 = 1
    ): this {

        const row = offset >> SHIFT;
        const col = offset % COLS;
        let bit = 1 << col;
        if (value) {
            this._arr[row] |= bit;
        } else {
            bit = 255 ^ bit;
            this._arr[row] &= bit;
        }
        return this;
    }

    fill(
        value: 0 | 1
    ): this {

        const fillValue = (value) ? 255 : 0;
        super.fill(fillValue);
        return this;
    }

    resize(
        size: number
    ): this {

        size = (size >> SHIFT) + 1;
        super.resize(size);
        return this;
    }
}