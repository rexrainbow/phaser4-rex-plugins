import { Texture } from '@phaserjs/phaser/textures/Texture';
import { DrawCanvasTexture } from './DrawCanvasTexture';
import { Vec2Type } from '../../utils/types/VectorType';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';
import { DrawPolygon } from '../../utils/canvas/DrawPolygon';
import { GetStyle } from '../../utils/canvas/GetStyle';

export interface IConfig {
    points?: Vec2Type[];
    fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType;
    strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType;
    lineWidth?: number;
    lineJoin?: 'bevel' | 'round' | 'miter';
}

export function CreatePolygonTexture(
    key: string | Texture,
    {
        points,
        fillStyle,
        strokeStyle,
        lineWidth = 2,
        lineJoin = 'round'
    }: IConfig = {}
): Texture {

    return DrawCanvasTexture(key, function (canvas, context) {
        if ((!points) || (points.length === 0)) {
            canvas.width = 1;
            canvas.height = 1;
            return;
        }

        if (!strokeStyle) {
            lineWidth = 0;
        }

        let minX = Infinity,
            minY = Infinity,
            maxX = -Infinity,
            maxY = -Infinity;
        for (let i = 0, cnt = points.length; i < cnt; i++) {

            const p = points[i], px = p.x, py = p.y;
            minX = Math.min(minX, px);
            minY = Math.min(minY, py);
            maxX = Math.max(maxX, px);
            maxY = Math.max(maxY, py);
        }

        const width = maxX - minX;
        const height = maxY - minY;

        const halfW = width / 2;
        const halfH = height / 2;
        const halfLW = lineWidth / 2;

        canvas.width = Math.ceil(width);
        canvas.height = Math.ceil(height);

        let drawPoints: Vec2Type[] = [];
        for (let i = 0, cnt = points.length; i < cnt; i++) {
            const point = points[i];
            drawPoints.push({
                x: Indent((point.x - minX), halfW, halfLW),
                y: Indent((point.y - minY), halfH, halfLW)
            })
        }

        DrawPolygon(
            canvas, context,
            drawPoints,
            GetStyle(fillStyle, canvas, context),
            GetStyle(strokeStyle, canvas, context),
            lineWidth,
            lineJoin
        )

    });
}

function Indent(
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