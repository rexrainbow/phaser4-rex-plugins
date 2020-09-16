import { IBaseText } from './IBaseText';
import { AlignPositionMode, AlignPositionModeString } from '../../../utils/types/AlignPositionMode';

export function SetAlign(
    baseText: IBaseText,
    align: AlignPositionMode | AlignPositionModeString
) {
    if (typeof (align) === 'string') {
        align = AlignPositionMode[align];
    }
    baseText.align = align;
}