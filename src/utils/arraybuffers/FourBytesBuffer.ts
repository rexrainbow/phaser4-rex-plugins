import { BaseBuffer,DataType } from './BaseBuffer';

export class FourBytesBuffer extends BaseBuffer {

    constructor(size: number = 0) {
        super(DataType.unit32, size);
    }
}