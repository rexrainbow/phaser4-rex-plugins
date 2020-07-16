import { ContextStyleType } from '../Types';

export abstract class BaseParser<PropType> {

    abstract splitText(
        text: string,
        isPlainTextMode?: boolean
    ): string[];

    abstract tagTextToProp(
        text: string,
        prevProp: PropType
    ): { plainText: string, prop: PropType };

    abstract propToContextStyle(
        defaultStyle: ContextStyleType,
        prop: PropType
    ): ContextStyleType;

    abstract propToTagText(
        text: string,
        prop: PropType,
        prevProp: PropType
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