import { IBaseText, PaddingConfigType } from './IBaseText';
import { WrapMode } from './Types';

export function SetFixedSize(
    baseText: IBaseText,
    width: number = 0,
    height: number = 0
): void {

    baseText.fixedWidth = width;
    baseText.fixedHeight = height;

    UpdateWrapWidth(baseText);
}

export function SetPadding(
    baseText: IBaseText,
    left: number | PaddingConfigType,
    right?: number,
    top?: number,
    bottom?: number
) {

    const padding = baseText.padding;
    if (typeof (left) === 'number') {
        padding.left = left;
        padding.right = (right === undefined) ? left : right;
        padding.top = (top === undefined) ? left : top;
        padding.bottom = (bottom === undefined) ? left : bottom;
    } else {
        let paddingConfig = left;
        padding.left = paddingConfig.left ?? 0;
        padding.right = paddingConfig.right ?? 0;
        padding.top = paddingConfig.top ?? 0;
        padding.bottom = paddingConfig.bottom ?? 0;
    }

    UpdateWrapWidth(baseText);
}

export function UpdateWrapWidth(
    baseText: IBaseText
) {

    const width = baseText.fixedWidth;
    if (baseText.wrapMode !== WrapMode.none) {
        const padding = baseText.padding;
        const wrapWidth = width - padding.left - padding.right;
        baseText.wrapWidth = Math.max(wrapWidth, 0);
    } else {
        baseText.wrapWidth = 0;
    }
}