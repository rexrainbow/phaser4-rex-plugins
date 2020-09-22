import { IPadding } from '../../util/IPadding';
import { AlignPositionMode, AlignPositionModeString } from '../../../../utils/types/AlignPositionMode';

export interface IAddConfig {
    key?: string | number,
    padding?: IPadding | number;
    align?: AlignPositionMode | AlignPositionModeString;
    expand?: boolean |
    {
        width?: boolean,
        height?: boolean
    };
}