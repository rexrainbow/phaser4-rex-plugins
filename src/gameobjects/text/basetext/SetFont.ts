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