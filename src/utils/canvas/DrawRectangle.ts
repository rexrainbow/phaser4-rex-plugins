export function DrawRectangle(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    fillStyle?: string | CanvasGradient | CanvasPattern,
    strokeStyle?: string | CanvasGradient | CanvasPattern,
    lineWidth?: number,
    fillColor2?: string,
    isHorizontalGradient: boolean = true
) {

    context.beginPath();

    context.rect(x, y, width, height);

    if (fillStyle) {
        if (fillColor2) {
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

    if (strokeStyle) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.stroke();
    }
}