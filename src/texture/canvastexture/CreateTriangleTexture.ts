import { Texture } from '@phaserjs/phaser/textures/Texture';
import { CreatePolygonTexture } from './CreatePolygonTexture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';

export enum Direction {
    right = 0,
    down = 1,
    left = 2,
    up = 3
}

export interface IConfig {
    direction?: Direction,
    width?: number,
    height?: number,
    fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    lineWidth?: number
}

export let CreateTriangleTexture = function (
    key: string | Texture,
    {
        direction = Direction.right,
        width = 32,
        height = width,
        fillStyle,
        strokeStyle,
        lineWidth = 3
    }: IConfig = {}
): Texture {

    let x1: number, y1: number,
        x2: number, y2: number,
        x3: number, y3: number;
    switch (direction) {
        case Direction.down:
            x1 = 0;
            y1 = 0;
            x2 = width;
            y2 = 0;
            x3 = width / 2;
            y3 = height;
            break;
        case Direction.left:
            x1 = 0;
            y1 = height / 2;
            x2 = width;
            y2 = 0;
            x3 = width;
            y3 = height;
            break;
        case Direction.up:
            x1 = 0;
            y1 = height;
            x2 = width / 2;
            y2 = 0;
            x3 = width;
            y3 = height;
            break;
        default: // Direction.right
            x1 = 0;
            y1 = 0;
            x2 = 0;
            y2 = height;
            x3 = width;
            y3 = height / 2;
            break;
    }

    return CreatePolygonTexture(key, {
        points: [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            { x: x3, y: y3 }
        ],
        fillStyle: fillStyle,
        strokeStyle: strokeStyle,
        lineWidth: lineWidth
    })
}