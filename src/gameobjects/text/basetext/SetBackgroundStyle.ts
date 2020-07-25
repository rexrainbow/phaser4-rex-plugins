import { IBaseText } from './IBaseText';
import { FillStyleType, IRadiusConfig } from './Types';

export function SetBackgroundStyle(
    baseText: IBaseText,
    fillStyle: FillStyleType,
    strokeStyle: FillStyleType,
    strokeThickness: number = 0,
    radius: IRadiusConfig | number = 0
) {
    if (!strokeStyle) {
        strokeThickness = 0;
    }

    baseText.backgroundFillStyle = fillStyle;
    baseText.backgroundStrokeStyle = strokeStyle;
    baseText.backgroundStrokeThickness = strokeThickness;
    baseText.cornerRadius = radius;
}