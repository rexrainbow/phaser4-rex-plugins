import { CanvasBase } from './CanvasBase';
import {
    Fill,
    LoadFromURL, LoadFromURLPromise, GetDataURL,
    GetPixel, SetPixel
} from './CanvasMethods';
import {
    GenerateTexture, LoadTexture
} from './TextureMethods';


export class Canvas extends CanvasBase {

    fill(
        fillStyle: string | CanvasGradient | CanvasPattern = '#fff'
    ): this {

        Fill(this, fillStyle);
        return this;
    }

    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    getDataURL(
        type?: string,
        encoderOptions?: any
    ): string {

        return GetDataURL(this, type, encoderOptions);
    }

    getPixel(
        x: number,
        y: number,
        out: [number, number, number, number] = [0, 0, 0, 0]
    ): [number, number, number, number] {

        return GetPixel(this, x, y, out);
    }

    generateTexture(
        key: string,
        x: number = 0,
        y: number = 0,
        width: number = this.width,
        height: number = this.height
    ): this {

        GenerateTexture(this, key, x, y, width, height);
        return this;
    }

    loadFromURL(
        url: string,
        callback?: () => void
    ): this {

        LoadFromURL(this, url, callback);
        return this;
    }

    loadFromURLPromise(
        url: string
    ): Promise<number> {

        return LoadFromURLPromise(this, url);
    }

    loadTexture(
        key: string,
        frame?: string | number
    ): this {

        LoadTexture(this, key, frame);
        return this;
    }

    setPixel(
        x: number, y: number,
        r: number, g: number, b: number, a?: number
    ): this {

        SetPixel(this, x, y, r, g, b, a);
        return this;
    }
}