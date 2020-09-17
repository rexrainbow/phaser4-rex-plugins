import { IBaseText } from './IBaseText';
import { FillStyleType, IRadiusConfig } from './Types';

export function SetBackgroundStyle(
    baseText: IBaseText,
    fillStyle: FillStyleType,
    strokeStyle: FillStyleType,
    strokeThickness: number = 0,
    radius: IRadiusConfig | number = 0,
    fillColor2: string,
    isHorizontalGradient: boolean = true
) {
    if (!strokeStyle) {
        strokeThickness = 0;
    }

    baseText.backgroundFillStyle = fillStyle;
    baseText.backgroundFillColor2 = fillColor2;
    baseText.backgroundIsHorizontalGradient = isHorizontalGradient;
    baseText.backgroundStrokeStyle = strokeStyle;
    baseText.backgroundStrokeThickness = strokeThickness;
    baseText.cornerRadius = radius;
}