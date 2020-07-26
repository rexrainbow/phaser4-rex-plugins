import { IBaseText } from './IBaseText';
import { WrapMode } from './Types';

export function SetFixedSize(
    baseText: IBaseText,
    width: number,
    height?: number
): void {

    baseText.fixedWidth = width;
    baseText.fixedHeight = height;

    if (baseText.wrapMode !== WrapMode.none) {
        const padding = baseText.padding;
        const wrapWidth = width - padding.left - padding.right;
        baseText.wrapWidth = Math.max(wrapWidth, 0);
    }
}