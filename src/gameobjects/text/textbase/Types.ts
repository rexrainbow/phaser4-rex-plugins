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

export enum NewLineMode {
    none = 0,
    raw = 1,
    wrapped = 2
}

export enum WrapMode {
    none = 0,
    word = 1,
    char = 2
}