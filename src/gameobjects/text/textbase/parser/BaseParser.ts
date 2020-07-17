import { StyleType } from '../Types';

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
        defaultStyle: StyleType,
        prop: PropType
    ): StyleType;

    abstract propToTagText(
        text: string,
        prop: PropType,
        prevProp: PropType
    ): string;
}

export const ContextStyleResult: StyleType = {
    font: undefined,
    fontFamily: undefined,
    fontStyle: undefined,
    fontSize: undefined,
    color: undefined,

    stroke: undefined,
    strokeThickness: undefined,

    shadowColor: undefined,
    shadowOffsetX: undefined,
    shadowOffsetY: undefined,
    shadowBlur: undefined,
    shadowStroke: undefined,
    shadowFill: undefined,

    underlineColor: undefined,
    underlineThickness: undefined,
    underlineOffset: undefined,

    image: undefined,
}