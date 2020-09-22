import {
    IBaseSizer,
    IConfig as IBaseSizerConfig,
    ISpace as IBaseSizerSpace
} from '../basesizer/IBaseSizer';
import { ISizerState as IBaseSizerState } from '../util/ISizerState';
import { IChild } from '../util/IChild';
import { AlignPositionMode } from '../../../utils/types/AlignPositionMode';

export type KeyType = string | number;
export interface ISizerState extends IBaseSizerState {
    key: KeyType;
    align: AlignPositionMode;
    expandWidth: boolean;
    expandHeight: boolean;
}

export interface ISpace extends IBaseSizerSpace {
}

export interface IConfig extends IBaseSizerConfig {
}

export interface ISizer extends IBaseSizer {
    sizerChildren: Map<KeyType, IChild>;
}