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
    lineWidth?: number,
    fillColor2?: string,
    isHorizontalGradient: boolean = true
) {

    AddRoundRectanglePath(context, x, y, width, height, radiusConfig);


    if (fillStyle !== undefined) {
        if (fillColor2 !== undefined) {
            let grd: CanvasGradient;
            if (isHorizontalGradient) {
                grd = context.createLinearGradient(0, 0, width, 0);
            } else {
                grd = context.createLinearGradient(0, 0, 0, height);
            }
            grd.addColorStop(0, fillStyle as string);
            grd.addColorStop(1, fillColor2);
            fillStyle = grd;
        }

        context.fillStyle = fillStyle;
        context.fill();
    }

    if (strokeStyle !== undefined) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.stroke();
    }
}