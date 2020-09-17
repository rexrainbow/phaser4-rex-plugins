import {
    IBaseSizer,
    IConfig as IBaseSizerConfig,
    ISpace as IBaseSizerSpace
} from '../basesizer/IBaseSizer';
import { OrientationMode, OrientationModeString } from '../util/OrientationMode';
import { ISizerState as IBaseSizerState } from '../util/ISizerState';
import { IChild } from '../util/IChild';
import { AlignPositionMode } from '../../../utils/types/AlignPositionMode';
import { IAddConfig } from './add/Add';

export interface ISizerState extends IBaseSizerState {
    proportion: number;
    expand: boolean;
    align: AlignPositionMode;
}

export interface ISpace extends IBaseSizerSpace {
    item?: number
}

export interface IConfig extends IBaseSizerConfig {
    space?: ISpace;
    orientation?: OrientationMode | OrientationModeString;
}

export interface ISizer extends IBaseSizer {
    space: ISpace;
    orientation: OrientationMode;
    childrenProportion: number;
    _childrenProportion: number;
    proportionLength: number;
    sizerChildren: IChild[];

    getChildrenWidth(
        minimumMode?: boolean
    ): number;

    getChildrenHeight(
        minimumMode?: boolean
    ): number;

    add(
        child: IChild,
        config?: IAddConfig
    ): this;

    addSpace(
        proportion: number
    ): this;
}