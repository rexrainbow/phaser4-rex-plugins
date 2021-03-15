export function DrawCircle(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    rx: number,
    ry: number,
    fillStyle?: string | CanvasGradient | CanvasPattern,
    strokeStyle?: string | CanvasGradient | CanvasPattern,
    lineWidth: number = 2,
    startAngle: number = 0,
    endAngle: number = (2 * Math.PI),
    anticlockwise: boolean = false
): void {

    context.beginPath();

    context.ellipse(x, y, rx, ry, 0, startAngle, endAngle, anticlockwise);

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