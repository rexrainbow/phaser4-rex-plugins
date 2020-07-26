import { IBaseText } from './IBaseText';
import { WrapMode, WrapModeString } from './Types';

export function SetWrapMode(
    baseText: IBaseText,
    wrapMode: WrapMode | WrapModeString,
    wrapWidth: number = 0
): void {

    if (typeof (wrapMode) === 'string') {
        wrapMode = WrapMode[wrapMode];
    }
    baseText.wrapMode = wrapMode;

    if (wrapMode !== WrapMode.none) {
        const width = baseText.fixedWidth;
        if (width > 0) {
            const padding = baseText.padding;
            wrapWidth = width - padding.left - padding.right;
        }
    }
    baseText.wrapWidth = wrapWidth;
}