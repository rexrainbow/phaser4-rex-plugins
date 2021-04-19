import {
    IBaseSizer,
    IConfig as IBaseSizerConfig,
    ISpace as IBaseSizerSpace
} from '../basesizer/IBaseSizer';

import { ISizerState as IBaseSizerState } from '../util/ISizerState';
import { IChild } from '../util/IChild';
import { AlignPositionMode } from '../../../utils/types/AlignPositionMode';
import { IAddConfig } from './add/IAddConfig';

export interface ISizerState extends IBaseSizerState {
    expand: boolean;
    align: AlignPositionMode;
}

export interface ISpace extends IBaseSizerSpace {
    column?: number | number[];
    row?: number | number[];
}

export interface IConfig extends IBaseSizerConfig {
    column?: number;
    row?: number;
    columnProportions?: number | number[];
    rowProportions?: number | number[];
    space?: ISpace;
}

export interface ISizer extends IBaseSizer {
    sizerChildren: (IChild | null)[];
    space: {
        column: number[],
        row: number[]
    } & IBaseSizer["space"];

    columnCount: number;
    rowCount: number;
    columnProportions: number[];
    rowProportions: number[];
    totalColumnProportions: number;
    _totalColumnProportions: number;
    totalRowProportions: number;
    _totalRowProportions: number;
    proportionWidthLength: number;
    proportionHeightLength: number;
    columnWidth: number[];
    rowHeight: number[];
}