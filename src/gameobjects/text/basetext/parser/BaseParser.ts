import { IStyle } from '../Types';

export type PropType = { [key: string]: any };

export abstract class BaseParser {

    abstract splitText(
        text: string,
        isPlainTextMode?: boolean
    ): string[];

    abstract tagTextToProp(
        text: string,
        prevProp: PropType
    ): { text: string, prop: PropType };

    abstract propToStyle(
        defaultStyle: IStyle,
        prop: PropType
    ): IStyle;

    abstract propToTagText(
        text: string,
        prop: PropType,
        prevProp: PropType
    ): string;
}

export const ContextStyleResult: IStyle = {
    font: undefined,
    fontFamily: undefined,
    fontStyle: undefined,
    fontSize: undefined,
    fillStyle: undefined,

    strokeStyle: undefined,
    strokeThickness: undefined,

    shadowColor: undefined,
    shadowOffsetX: undefined,
    shadowOffsetY: undefined,
    shadowBlur: undefined,
    shadowStroke: undefined,
    shadowFill: undefined,

    underlineStyle: undefined,
    underlineThickness: undefined,
    underlineOffsetY: undefined,

    image: undefined,
}