import { Texture } from '@phaserjs/phaser/textures/Texture';
import { DrawCanvasTexture } from './DrawCanvasTexture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';
import { DrawCircle } from '../../utils/canvas/DrawCircle';
import { GetStyle } from '../../utils/canvas/GetStyle';

export interface IConfig {
    width?: number,
    height?: number,
    fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    lineWidth?: number
}

export function CreateCircleTexture(
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

        const x = canvas.width / 2,
            y = canvas.height / 2,
            rx = (width - lineWidth) / 2,
            ry = (height - lineWidth) / 2;

        DrawCircle(
            canvas, context,
            x, y, rx, ry,
            GetStyle(fillStyle, canvas, context),
            GetStyle(strokeStyle, canvas, context),
            lineWidth
        );

    });
}