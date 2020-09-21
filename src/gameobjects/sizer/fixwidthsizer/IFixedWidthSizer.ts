import {
    IBaseSizer,
    IConfig as IBaseSizerConfig,
    ISpace as IBaseSizerSpace
} from '../basesizer/IBaseSizer';
import { OrientationMode, OrientationModeString } from '../util/OrientationMode';
import { ISizerState as IBaseSizerState } from '../util/ISizerState';
import { IChild } from '../util/IChild';
import { IAddConfig } from './add/IAddConfig';

export enum AlignMode {
    left = 0,
    top = 0,
    right = 1,
    bottom = 1,
    center = 2,
    justify = 3,
    'justify-left' = 3,
    'justify-top' = 3,
    'justify-right' = 4,
    'justify-bottom' = 4,
    'justify-center' = 5
}

export type AlignModeString = 'left' | 'top' | 'right' | 'bottom' | 'center' | 'justify' |
    'justify-left' | 'justify-top' | 'justify-right' | 'justify-bottom' | 'justify-center';

export interface ISizerState extends IBaseSizerState {
}

export interface ISpace extends IBaseSizerSpace {
    item?: number;
    line?: number;
}

export interface IConfig extends IBaseSizerConfig {
    space?: ISpace;
    orientation?: OrientationMode | OrientationModeString;
    align?: AlignMode | AlignModeString;
    rtl?: boolean;
}


export interface ISizer extends IBaseSizer {
    sizerChildren: (IChild | '\n')[];
    space: {
        item: number,
        line: number
    } & IBaseSizer["space"];

    orientation: OrientationMode;
    align: AlignMode;
    rtl: boolean;

    maxChildWidth: number;
    _maxChildWidth: number;

    maxChildHeight: number;
    _maxChildHeight: number;
}