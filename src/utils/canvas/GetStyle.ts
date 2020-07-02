import { GetCanvasGradientCallbackType } from '../types/GetCanvasGradientCallbackType';

export let GetStyle = function (
    style: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
): string | CanvasGradient | CanvasPattern {

    switch (typeof (style)) {
        case 'number': return `#${style.toString(16)}`;
        case 'function': return style(canvas, context);
        default: return style;
    }
}