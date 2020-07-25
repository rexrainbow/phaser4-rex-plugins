export function DrawRectangle(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    fillStyle?: string | CanvasGradient | CanvasPattern,
    strokeStyle?: string | CanvasGradient | CanvasPattern,
    lineWidth?: number
) {

    context.beginPath();

    context.rect(x, y, width, height);

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