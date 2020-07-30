import { IBaseText } from './IBaseText';
import { WrapMode, WrapModeString } from './Types';
import { UpdateWrapWidth } from './SetSizeMethods';

export function SetWrapMode(
    baseText: IBaseText,
    wrapMode: WrapMode | WrapModeString,
    wrapWidth?: number
): void {

    if (typeof (wrapMode) === 'string') {
        wrapMode = WrapMode[wrapMode];
    }
    baseText.wrapMode = wrapMode;

    if (wrapWidth === undefined) {
        UpdateWrapWidth(baseText);
    } else {
        baseText.wrapWidth = wrapWidth;
    }

}