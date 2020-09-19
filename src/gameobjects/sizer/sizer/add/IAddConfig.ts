import { IPadding } from '../../util/IPadding';
import { AlignPositionMode, AlignPositionModeString } from '../../../../utils/types/AlignPositionMode';

export interface IAddConfig {
    proportion?: number;
    padding?: IPadding | number;
    align?: AlignPositionMode | AlignPositionModeString;
    expand?: boolean;
    childKey?: string;
    index?: number
}