export function DrawCircle(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    rx: number,
    ry: number,
    fillStyle?: string | CanvasGradient | CanvasPattern,
    strokeStyle?: string | CanvasGradient | CanvasPattern,
    lineWidth: number = 2
): void {

    context.beginPath();

    context.ellipse(x, y, rx, ry, 0, 0, (2 * Math.PI));

    if (fillStyle !== undefined) {
        context.fillStyle = fillStyle;
        context.fill();
    }

    if (strokeStyle !== undefined) {
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.stroke();
    }
}