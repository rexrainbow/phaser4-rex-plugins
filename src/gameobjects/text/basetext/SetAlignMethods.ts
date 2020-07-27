import { IBaseText } from './IBaseText';
import {
    HAlignMode, HAlignModeString,
    VAlignMode, VAlignModeString
} from './Types';

export function SetHAlign(
    baseText: IBaseText,
    hAlign: HAlignMode | HAlignModeString = HAlignMode.left
) {
    if (typeof (hAlign) === 'string') {
        hAlign = HAlignMode[hAlign];
    }

    baseText.hAlign = hAlign;
}

export function SetVAlign(
    baseText: IBaseText,
    vAlign: VAlignMode | VAlignModeString = VAlignMode.top
) {
    if (typeof (vAlign) === 'string') {
        vAlign = VAlignMode[vAlign];
    }

    baseText.vAlign = vAlign;
}