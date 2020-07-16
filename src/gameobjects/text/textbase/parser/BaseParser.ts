import { ContextStyleType } from '../Types';

export abstract class BaseParser {

    abstract splitText(
        text: string,
        isPlainTextMode?: boolean
    ): string[];

    abstract tagTextToProp(
        text: string,
        prevProp: object
    ): { plainText: string, prop: object };

    abstract propToStyle(
        defaultStyle: ContextStyleType,
        prop: object
    ): ContextStyleType;

    abstract propToTagText(
        text: string,
        prop: object,
        prevProp: object
    ): string;
}

export const ContextStyleResult: ContextStyleType = {
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