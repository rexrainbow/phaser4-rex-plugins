import { IBaseText } from './IBaseText';
import { FillStyleType } from './Types';

export function SetUnderline(
    baseText: IBaseText,
    style: FillStyleType,
    thickness: number = 2,
    offsetY: number = 0
): void {

    baseText.underlineStyle = style;
    baseText.underlineThickness = thickness;
    baseText.underlineOffsetY = offsetY;
}