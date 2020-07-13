import { Texture } from '@phaserjs/phaser/textures/Texture';
import { DrawCanvasTexture } from './DrawCanvasTexture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';
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
        if (!strokeStyle) {
            lineWidth = 0;
        }

        canvas.width = Math.ceil(width);
        canvas.height = Math.ceil(height);

        context.beginPath();

        let halfLineWidth = lineWidth / 2;
        context.rect(
            halfLineWidth,
            halfLineWidth,
            (width - lineWidth),
            (height - lineWidth)
        );

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