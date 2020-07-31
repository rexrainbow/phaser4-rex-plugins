import { IBaseText } from './IBaseText';

export function SetTextOffsetY(
    baseText: IBaseText,
    offsetY: number,
    isPercent: boolean = false
): void {

    if (isPercent) {
        baseText.textOffsetYPercentage = offsetY;
    } else {
        baseText.textOffsetY = offsetY;
    }

}