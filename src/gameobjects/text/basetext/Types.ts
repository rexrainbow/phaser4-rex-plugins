export type FillStyleType = string | CanvasGradient | CanvasPattern;

export enum HAlignMode {
    left = 0,
    center = 1,
    right = 2
}

export type HAlignModeString = 'left' | 'center' | 'right';

export enum VAlignMode {
    top = 0,
    center = 1,
    bottom = 2
}

export type VAlignModeString = 'top' | 'center' | 'bottom';

import { IRadiusConfig } from '../../../utils/geom/roundrectangle/IRoundRectangle';
export { IRadiusConfig };

export interface IStyle {

    backgroundFillStyle?: FillStyleType;
    backgroundStrokeStyle?: FillStyleType;
    backgroundStrokeThickness?: number;
    cornerRadius?: IRadiusConfig | number;

    antialias?: boolean;

    font?: string;
    fontStyle?: string;
    fontFamily?: string;
    fontSize?: string | number;
    fillStyle?: FillStyleType;

    strokeStyle?: FillStyleType;
    strokeThickness?: number;

    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowBlur?: number;
    shadowStroke?: boolean;
    shadowFill?: boolean;

    underlineStyle?: FillStyleType;
    underlineThickness?: number;
    underlineOffset?: number;

    image?: string;
}

import { WrapMode, NewLineMode, GetTextWidthCallbackType } from '../../../utils/string/WrapText';
export { WrapMode, NewLineMode, GetTextWidthCallbackType };