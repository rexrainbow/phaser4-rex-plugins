import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetRandom } from '@phaserjs/phaser/utils/array/GetRandom';
import { Vec2Type } from '../../utils/types/VectorType';

interface ICanvasGameObjectType extends IContainer {
    canvas: HTMLCanvasElement,
}

export interface IConfig {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    scaleX?: number,
    scaleY?: number,
    offsetX?: number,
    offsetY?: number
}

class BitmapZone {
    data: number[] = [];
    width: number = 0;
    height: number = 0;
    offsetX: number = 0;
    offsetY: number = 0;
    scaleX: number = 1;
    scaleY: number = 1;


    constructor(
        canvasObject: ICanvasGameObjectType,
        config?: IConfig
    ) {

        this.setSource(canvasObject, config);
    }

    setSource(
        canvasObject: ICanvasGameObjectType,
        config: IConfig = {}
    ) {

        const canvas = canvasObject.canvas;
        const {
            x = 0,
            y = 0,
            width = canvas.width - x,
            height = canvas.height - y
        } = config;

        const context = canvas.getContext('2d');
        const imgData = context.getImageData(x, y, width, height).data;
        const data = this.data;
        data.length = 0;
        for (let i = 0, cnt = (imgData.length / 4); i < cnt; i++) {
            if (imgData[(i * 4) + 3] > 0) {
                data.push(i);
            }
        }

        this.width = width;
        this.height = height;

        const {
            scaleX = canvasObject,
            scaleY
        } = config;
        this.setScale(scaleX, scaleY);

        const {
            offsetX = canvasObject,
            offsetY
        } = config;
        this.setOffset(offsetX, offsetY);

        return this;
    }

    setOffset(
        offsetX: number | ICanvasGameObjectType,
        offsetY?: number
    ): this {

        if (typeof (offsetX) !== 'number') {
            const canvasObject = offsetX;
            // TODO: displayWidth/displayHeight?
            offsetX = -(canvasObject.originX * canvasObject.width * canvasObject.scaleX);
            offsetY = -(canvasObject.originY * canvasObject.height * canvasObject.scaleY);
        }

        this.offsetX = offsetX;
        this.offsetY = offsetY;
        return this;
    }

    setScale(
        scaleX: number | ICanvasGameObjectType,
        scaleY?: number
    ): this {

        if (typeof (scaleX) !== 'number') {
            const canvasObject = scaleX;
            scaleX = canvasObject.scaleX;
            scaleY = canvasObject.scaleY;
        }

        if (scaleY === undefined) {
            scaleY = scaleX;
        }

        this.scaleX = scaleX;
        this.scaleY = scaleY;
        return this;
    }

    getRandomPoint(
        out: Vec2Type = { x: 0, y: 0 }
    ): Vec2Type {

        if (this.data.length > 0) {
            const index = GetRandom(this.data);
            const x = index % this.width;
            const y = (index - x) / this.width;
            out.x = x * this.scaleX;
            out.y = y * this.scaleY;
        } else {
            out.x = 0;
            out.y = 0;
        }
        out.x += this.offsetX;
        out.y += this.offsetY;
        return out;
    }
}

export default BitmapZone;