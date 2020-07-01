import { Texture } from '@phaserjs/phaser/textures/Texture';
import { DrawCanvasTexture } from './DrawCanvasTexture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';
import { GetStyle } from '../../utils/canvas/GetStyle';

export let CreateCircleTexture = function (
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

        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let rx = (width - lineWidth) / 2;
        let ry = (height - lineWidth) / 2;

        context.beginPath();
        context.ellipse(x, y, rx, ry, 0, 0, (2 * Math.PI));

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