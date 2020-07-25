import { Texture } from '@phaserjs/phaser/textures/Texture';
import { DrawCanvasTexture } from './DrawCanvasTexture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';
import { DrawRectangle } from '../../utils/canvas/DrawRectangle';
import { GetStyle } from '../../utils/canvas/GetStyle';

export interface IConfig {
    width?: number,
    height?: number,
    fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    lineWidth?: number
}

export function CreateRectangleTexture(
    key: string | Texture,
    {
        width = 32,
        height = width,
        fillStyle,
        strokeStyle,
        lineWidth = 2
    }: IConfig = {}
): Texture {

    return DrawCanvasTexture(key, function (canvas, context) {

        canvas.width = Math.ceil(width);
        canvas.height = Math.ceil(height);

        if (!strokeStyle) {
            lineWidth = 0;
        }
        const halfLineWidth = lineWidth / 2;
        const x = halfLineWidth,
            y = halfLineWidth;

        width -= lineWidth;
        height -= lineWidth;

        DrawRectangle(
            canvas, context,
            x, y,
            width, height,
            GetStyle(fillStyle, canvas, context),
            GetStyle(strokeStyle, canvas, context),
            lineWidth
        );

    });
}