import { IBaseText, PaddingConfigType } from './IBaseText';

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
        padding.left = paddingConfig.left || 0;
        padding.right = paddingConfig.right || 0;
        padding.top = paddingConfig.top || 0;
        padding.bottom = paddingConfig.bottom || 0;
    }
}