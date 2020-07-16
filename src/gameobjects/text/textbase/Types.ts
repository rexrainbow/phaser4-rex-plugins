export type ColorType = string;

export type ContextStyleType = {
    fontFamily: string,
    fontStyle: string,
    fontSize: string,
    color: ColorType,

    stroke: ColorType,
    strokeThickness: number,

    shadowColor: ColorType,
    shadowOffsetX: number,
    shadowOffsetY: number,
    shadowBlur: number,
    shadowStroke: boolean,
    shadowFill: boolean,

    underlineColor: ColorType,
    underlineThickness: number,
    underlineOffset: number,

    image: string
}

import { WrapMode, NewLineMode } from '../../../utils/string/WrapText';
export { WrapMode, NewLineMode };