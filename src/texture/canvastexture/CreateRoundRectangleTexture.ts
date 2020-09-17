import { Texture } from '@phaserjs/phaser/textures/Texture';
import { DrawCanvasTexture } from './DrawCanvasTexture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';
import { IRadiusConfig } from '../../utils/geom/roundrectangle/IRoundRectangle';
import { DrawRoundRectangle } from '../../utils/canvas/DrawRoundRectangle';
import { GetStyle } from '../../utils/canvas/GetStyle';

export interface IConfig {
    width?: number;
    height?: number;
    radius?: IRadiusConfig | number;
    fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType;
    fillColor2?: string;
    isHorizontalGradient?: boolean;
    strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType;
    lineWidth?: number;
}

export function CreateRoundRectangleTexture(
    key: string | Texture,
    {
        width = 32,
        height = width,
        radius = 0,
        fillStyle,
        fillColor2,
        isHorizontalGradient = true,
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
        const x = halfLineWidth;
        const y = halfLineWidth;

        width -= lineWidth;
        height -= lineWidth;

        DrawRoundRectangle(
            canvas, context,
            x, y,
            width, height,
            radius,
            GetStyle(fillStyle, canvas, context),
            GetStyle(strokeStyle, canvas, context),
            lineWidth,
            fillColor2,
            isHorizontalGradient
        );

    });
}