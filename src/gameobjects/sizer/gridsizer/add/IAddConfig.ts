import { IPadding } from '../../util/IPadding';
import { AlignPositionMode, AlignPositionModeString } from '../../../../utils/types/AlignPositionMode';

export interface IAddConfig {
    column?: number,
    row?:number,
    align?: AlignPositionMode | AlignPositionModeString;
    padding?: IPadding | number;
    expand?: boolean;
    childKey?: string;
}