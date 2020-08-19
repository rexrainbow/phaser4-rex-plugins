import { IBuffer, IBufferConstructor } from '../../../utils/arraybuffers/IBuffer';

export type FillFromCanvasCallbackType = (imgData: Uint8ClampedArray, index: number) => number;
export type ForEachCallbackType = (value: number, x: number, y: number, canvasData: CanvasData) => void

export class CanvasData {
    width: number;
    height: number;
    buffer: IBuffer;

    constructor(
        BufferClass: IBufferConstructor,
        width: number = 0,
        height: number = width
    ) {

        this.width = width;
        this.height = height;
        this.buffer = new BufferClass(width * height);
    }

    getOffset(
        x: number,
        y: number
    ): number {

        return y * this.width + x;
    }

    get(
        x: number,
        y: number
    ): number {

        let offset: number;
        if (arguments.length === 2) {
            offset = this.getOffset(x, y);
        } else {
            offset = x;
        }
        return this.buffer.get(offset);
    }

    set(
        x: number,
        y: number,
        value: number = y
    ): this {

        let offset: number;
        if (arguments.length === 3) {
            offset = this.getOffset(x, y);
        } else { // arguments.length === 2
            offset = x;
        }
        this.buffer.set(offset, value);
        return this;
    }

    fillFromCanvas(
        canvas: HTMLCanvasElement,
        x: number = 0,
        y: number = 0,
        width: number = canvas.width - x,
        height: number = canvas.height - y,
        callback: FillFromCanvasCallbackType,
        scope: unknown
    ) {

        this.resize(width, height);
        const context = canvas.getContext('2d');
        const imgData = context.getImageData(x, y, width, height).data;
        const pixels = imgData.length;
        for (let i = 0, cnt = pixels / 4; i < cnt; i++) {
            const index = i * 4;
            let value: number;
            if (scope) {
                value = callback.call(scope, imgData, index);
            } else {
                value = callback(imgData, index);
            }
            this.set(i, value);
        }

        return this;
    }

    fill(
        value: number
    ): this {

        this.buffer.fill(value);
        return this;
    }

    clear() {
        this.fill(0);
        return this;
    }

    resize(
        width: number,
        height: number
    ): this {

        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        this.width = width;
        this.height = height;
        this.buffer.resize(width * height);
        return this;
    }

    forEach(
        callback: ForEachCallbackType,
        scope: unknown,
        skipZero: boolean = false
    ): this {

        for (let y = 0, h = this.height; y < h; y++) {
            for (let x = 0, w = this.width; x < w; x++) {
                const value = this.get(x, y);
                if (skipZero && (value === 0)) {
                    continue;
                }

                if (scope) {
                    callback.call(scope, value, x, y, this);
                } else {
                    callback(value, x, y, this);
                }
            }
        }
        return this;
    }

    forEachNonZero(
        callback: ForEachCallbackType,
        scope?: unknown
    ): this {

        this.forEach(callback, scope, true);
        return this;
    }
};