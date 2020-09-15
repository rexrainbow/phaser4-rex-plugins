import { IBaseText } from './IBaseText';

export function SetTextScrollY(
    baseText: IBaseText,
    offsetY: number,
    isPercent: boolean = false
): void {

    if (isPercent) {
        baseText.textOffsetYPercentage = offsetY;
    } else {
        baseText.textScrollY = offsetY;
    }

}