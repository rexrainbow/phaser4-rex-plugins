import { IBaseText } from './IBaseText';
import { SplitTextRegExp } from '../../../utils/string/WrapText';

export function GetWrappedText(
    baseText: IBaseText,
    text?: string,
    start?: number,
    end?: number
): string[] {

    text = baseText.canvasText.getText(text, start, end, true);
    return text.split(SplitTextRegExp);
}

export function GetPlainText(
    baseText: IBaseText,
    text?: string,
    start?: number,
    end?: number
): string {

    return baseText.canvasText.getPlainText(text, start, end);
}

export function GetText(
    baseText: IBaseText,
    text?: string,
    start?: number,
    end?: number
): string {

    return baseText.canvasText.getText(text, start, end, false);
}

export function GetSubString(
    baseText: IBaseText,
    text?: string,
    start?: number,
    end?: number
): string {

    return baseText.canvasText.getText(text, start, end, false);
}