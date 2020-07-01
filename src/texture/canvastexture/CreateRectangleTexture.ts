import { Texture } from '@phaserjs/phaser/textures/Texture';
import { DrawCanvasTexture } from './DrawCanvasTexture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';
import { GetStyle } from '../../utils/canvas/GetStyle';

export let CreateRectangleTexture = function (
    key: string | Texture,
    width: number,
    height: number,
    fillStyle: string | number | null | GetCanvasGradientCallbackType | CanvasGradient,
    strokeStyle?: string | number | GetCanvasGradientCallbackType,
    lineWidth: number = 3
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