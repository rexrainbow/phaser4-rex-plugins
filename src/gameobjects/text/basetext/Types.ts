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

export type StyleType = {
    backgroundStyle?: FillStyleType,

    antialias?: boolean,


    font?: string,
    fontFamily?: string,
    fontStyle?: string,
    fontSize?: string,
    fillStyle?: FillStyleType,

    strokeStyle?: FillStyleType,
    strokeThickness?: number,

    shadowColor?: string,
    shadowOffsetX?: number,
    shadowOffsetY?: number,
    shadowBlur?: number,
    shadowStroke?: boolean,
    shadowFill?: boolean,

    underlineStyle?: FillStyleType,
    underlineThickness?: number,
    underlineOffset?: number,


    lineSpacing?: number,
    wrapMode?: WrapMode,
    wrapWidth?: number,
    halign?: HAlignMode,
    valign?: VAlignMode,

    image?: string
}

import { WrapMode, NewLineMode, GetTextWidthCallbackType } from '../../../utils/string/WrapText';
export { WrapMode, NewLineMode, GetTextWidthCallbackType };