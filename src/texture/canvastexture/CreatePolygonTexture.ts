import { Texture } from '@phaserjs/phaser/textures/Texture';
import { DrawCanvasTexture } from './DrawCanvasTexture';
import { PositionType } from '../../utils/types/PositionType';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';
import { GetStyle } from '../../utils/canvas/GetStyle';

export interface IConfig {
    points: PositionType[],
    fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    lineWidth?: number,
    lineJoin?: 'bevel' | 'round' | 'miter'
}

export let CreatePolygonTexture = function (
    key: string | Texture,
    {
        points,
        fillStyle,
        strokeStyle,
        lineWidth = 3,
        lineJoin = 'round'
    }: IConfig = { points: [] }
): Texture {

    return DrawCanvasTexture(key, function (canvas, context) {
        if (points.length === 0) {
            canvas.width = 1;
            canvas.height = 1;
            return;
        }

        if (!strokeStyle) {
            lineWidth = 0;
        }

        let minX = GetMinProperty(points, 'x');
        let minY = GetMinProperty(points, 'y');
        let maxX = GetMaxProperty(points, 'x');
        let maxY = GetMaxProperty(points, 'y');

        let width = maxX - minX ;
        let height = maxY - minY ;

        let halfW = width / 2;
        let halfH = height / 2;
        let halfLW = lineWidth / 2;

        canvas.width = Math.ceil(width);
        canvas.height = Math.ceil(height);

        context.beginPath();
        context.lineJoin = lineJoin;

        let point = points[0];

        context.moveTo(
            Indent((point.x - minX), halfW, halfLW),
            Indent((point.y - minY), halfH, halfLW)
        );

        for (let i = 1, cnt = points.length; i < cnt; i++) {
            point = points[i];
            context.lineTo(
                Indent((point.x - minX), halfW, halfLW),
                Indent((point.y - minY), halfH, halfLW)
            )
        }

        context.closePath();

        if (fillStyle) {
            context.fillStyle = GetStyle(fillStyle, canvas, context);
            context.fill();
        }

        if (strokeStyle) {
            context.strokeStyle = GetStyle(strokeStyle, canvas, context);
            context.lineWidth = lineWidth;
            context.stroke();
        }

    });
}

let GetMaxProperty = function (
    items: object[],
    key: string
): number {

    let result = -Infinity;
    for (let i = 0, cnt = items.length; i < cnt; i++) {
        result = Math.max(result, items[i][key]);
    }
    return result;
}

let GetMinProperty = function (
    items: object[],
    key: string
): number {

    let result = Infinity;
    for (let i = 0, cnt = items.length; i < cnt; i++) {
        result = Math.min(result, items[i][key]);
    }
    return result;
}

let Indent = function (
    value: number,
    halfBound: number,
    offset: number
): number {

    if (value < halfBound) {
        return (value + offset);
    } else if (value > halfBound) {
        return (value - offset);
    } else {
        return value;
    }
}