import { Texture } from '@phaserjs/phaser/textures/Texture';
import { DrawCanvasTexture } from './DrawCanvasTexture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';
import { GetStyle } from '../../utils/canvas/GetStyle';

export let CreateCircleTexture = function (
    key: string | Texture,
    width: number | { width: number, height: number },
    fillStyle: string | number | null | undefined | false | GetCanvasGradientCallbackType | CanvasGradient,
    strokeStyle?: string | number | GetCanvasGradientCallbackType
): Texture {

    return DrawCanvasTexture(key, function (canvas, context) {
        let height: number,
            x: number,
            y: number;

        if (typeof (width) === 'number') {
            height = width;
        } else {
            ({ width, height } = width);
        }
        x = width / 2;
        y = height / 2;

        canvas.width = Math.ceil(width);
        canvas.height = Math.ceil(height);

        context.beginPath();
        if (width == height) {
            context.arc(x, x, x, 0, (2 * Math.PI));
        } else {
            context.ellipse(x, y, x, y, 0, 0, (2 * Math.PI));
        }

        if (fillStyle) {
            context.fillStyle = GetStyle(fillStyle, canvas, context);
            context.fill();
        }

        if (strokeStyle) {
            context.strokeStyle = GetStyle(strokeStyle, canvas, context);
            context.stroke();
        }

    });
}