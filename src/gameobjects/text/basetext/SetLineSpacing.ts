import { IBaseText } from './IBaseText';

export function SetLineSpacing(
    baseText: IBaseText,
    lineSpacing: number = 0
) {

    baseText.lineSpacing = lineSpacing;
}