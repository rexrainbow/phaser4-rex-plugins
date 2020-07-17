export type ColorType = string;

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
    backgroundColor?: string,

    font?: string,
    fontFamily?: string,
    fontStyle?: string,
    fontSize?: string,
    color?: ColorType,

    stroke?: ColorType,
    strokeThickness?: number,

    shadowColor?: ColorType,
    shadowOffsetX?: number,
    shadowOffsetY?: number,
    shadowBlur?: number,
    shadowStroke?: boolean,
    shadowFill?: boolean,

    underlineColor?: ColorType,
    underlineThickness?: number,
    underlineOffset?: number,

    image?: string,

    lineHeight?: number,
    maxLines?: number,
    halign?: HAlignMode,
    valign?: VAlignMode
}

import { WrapMode, NewLineMode, GetTextWidthCallback } from '../../../utils/string/WrapText';
export { WrapMode, NewLineMode, GetTextWidthCallback };