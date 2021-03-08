import { GetCanvasGradientCallbackType } from '../types/GetCanvasGradientCallbackType';
import { Pad, PadDirMode } from '../string/Pad';

export function GetStyle(
    style: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
): string | CanvasGradient | CanvasPattern {

    switch (typeof (style)) {
        case 'number': return `#${Pad(Math.floor(style).toString(16), 6, '0', PadDirMode.left)}`;
        case 'function': return style(canvas, context);
        default: return style;
    }
}