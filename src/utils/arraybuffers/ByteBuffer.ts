import { BaseBuffer,DataType } from './BaseBuffer';

export class ByteBuffer extends BaseBuffer {

    constructor(size: number = 0) {
        super(DataType.uint8, size);
    }
}