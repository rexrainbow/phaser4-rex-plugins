import { IBaseText } from './IBaseText';

export function SetTextOffsetY(
    baseText: IBaseText,
    offsetY: number
): void {

    baseText.textOffsetY = offsetY;
}