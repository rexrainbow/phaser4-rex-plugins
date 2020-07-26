import { IBaseText } from './IBaseText';

export function SetFont(
    baseText: IBaseText,
    fontFamily: string,
    fontSize: string | number
): void {

    if (fontFamily) {
        SetFontFamily(baseText, fontFamily);
    }

    if (fontSize) {
        SetFontSize(baseText, fontSize);
    }
}

export function SetFontFamily(
    baseText: IBaseText,
    fontFamily: string
) {

    baseText.fontFamily = fontFamily;
}

export function SetFontSize(
    baseText: IBaseText,
    fontSize: string | number
) {

    if (typeof (fontSize) === 'number') {
        fontSize = `${fontSize}px`;
    }
    baseText.fontSize = fontSize;
}


import { FillStyleType } from './Types';

export function SetFillStyle(
    baseText: IBaseText,
    style?: FillStyleType
) {

    baseText.fillStyle = style;
}

export function SetStrokeStyle(
    baseText: IBaseText,
    style?: FillStyleType,
    thickness: number = 2
) {

    baseText.strokeStyle = style;
    baseText.strokeThickness = thickness;
}

export function SetShadow(
    baseText: IBaseText,
    enableFillShadow: boolean,
    enableStrokeShadow: boolean,
    color: string = '#000',
    blur: number = 5,
    offsetX: number = 0,
    offsetY: number = 0
) {

    baseText.shadowFill = enableFillShadow;
    baseText.shadowStroke = enableStrokeShadow;
    baseText.shadowColor = color;
    baseText.shadowBlur = blur;
    baseText.shadowOffsetX = offsetX;
    baseText.shadowOffsetY = offsetY;
}