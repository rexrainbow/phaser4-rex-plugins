import { IStyle } from '../Types';

export function SyncFont(
    context: CanvasRenderingContext2D,
    style: IStyle
): void {

    context.font = style.font;
}

export function SyncStyle(
    context: CanvasRenderingContext2D,
    style: IStyle
): void {

    context.textBaseline = 'alphabetic';
    context.textAlign = 'start';

    context.fillStyle = style.fillStyle;
    context.strokeStyle = style.strokeStyle;

    context.lineWidth = style.strokeThickness;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.imageSmoothingEnabled = style.antialias;
}

export function SyncShadow(
    context: CanvasRenderingContext2D,
    style: IStyle,
    enable: boolean
): void {

    if (enable) {
        context.shadowColor = style.shadowColor;
        context.shadowBlur = style.shadowBlur;
        context.shadowOffsetX = style.shadowOffsetX;
        context.shadowOffsetY = style.shadowOffsetY;

    } else {
        context.shadowColor = '#000';
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;

    }
}