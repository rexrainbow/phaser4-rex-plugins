import { Vec2Type } from '../types/VectorType';

export function DrawPolygon(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    points: Vec2Type[],
    fillStyle?: string | CanvasGradient | CanvasPattern,
    strokeStyle?: string | CanvasGradient | CanvasPattern,
    lineWidth: number = 2,
    lineJoin: 'bevel' | 'round' | 'miter' = 'round'
): void {

    context.beginPath();

    context.lineJoin = lineJoin;

    let point = points[0];

    context.moveTo(point.x, point.y);

    for (let i = 1, cnt = points.length; i < cnt; i++) {
        point = points[i];
        context.lineTo(point.x, point.y);
    }

    context.closePath();

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