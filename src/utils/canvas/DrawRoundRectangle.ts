import { IRadiusConfig } from '../geom/roundrectangle/IRoundRectangle';
import { AddRoundRectanglePath } from './AddRoundRectanglePath'

export function DrawRoundRectangle(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radiusConfig: IRadiusConfig | number,
    fillStyle?: string | CanvasGradient | CanvasPattern,
    strokeStyle?: string | CanvasGradient | CanvasPattern,
    lineWidth?: number
) {

    AddRoundRectanglePath(context, x, y, width, height, radiusConfig);

    if (fillStyle) {
        context.fillStyle = fillStyle;
        context.fill();
    }

    if (strokeStyle) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.stroke();
    }
}