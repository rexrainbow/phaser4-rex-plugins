import { IBaseText } from './IBaseText';

export function SetPadding(
    baseText: IBaseText,
    left: number,
    right: number = left,
    top: number = left,
    bottom: number = left
) {

    const padding = baseText.padding;
    padding.left = left;
    padding.right = right;
    padding.top = top;
    padding.bottom = bottom;
}