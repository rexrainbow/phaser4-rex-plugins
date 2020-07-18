import { ContextStyleType } from '../Types';

export function SyncFont(
    context: CanvasRenderingContext2D,
    style: ContextStyleType
): void {

    context.font = style.font;
}

export function SyncStyle(
    context: CanvasRenderingContext2D,
    style: ContextStyleType
): void {

    context.textBaseline = 'alphabetic';
    context.textAlign = 'start';

    context.fillStyle = style.color;
    context.strokeStyle = style.stroke;

    context.lineWidth = style.strokeThickness;
    context.lineCap = 'round';
    context.lineJoin = 'round';
}

export function SyncShadow(
    context: CanvasRenderingContext2D,
    style: ContextStyleType,
    enable: boolean
): void {

    if (enable) {
        context.shadowOffsetX = style.shadowOffsetX;
        context.shadowOffsetY = style.shadowOffsetY;
        context.shadowColor = style.shadowColor;
        context.shadowBlur = style.shadowBlur;
    } else {
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowColor = '#000';
        context.shadowBlur = 0;
    }
}