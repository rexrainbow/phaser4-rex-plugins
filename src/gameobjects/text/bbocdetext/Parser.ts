import {
    BaseParser,
    ContextStyleResult
} from '../basetext/parser/BaseParser';
import { IStyle } from '../basetext/Types';

type PropType = {
    b?: true,
    i?: true,
    size?: string,
    color?: string,
    stroke?: string | true,
    u?: string | true,
    shadow?: true,
    img?: string,
    area?: string
}

export class Parser extends BaseParser {
    splitText(
        text: string,
        isPlainTextMode: boolean = false
    ): string[] {

        let result: string[] = [];

        let charIdx = 0;
        while (true) {
            const arr = RE_SPLITTEXT.exec(text);
            if (!arr) {
                break;
            }

            const m = arr[0];
            const matchStart = RE_SPLITTEXT.lastIndex - m.length;

            if (charIdx < matchStart) {
                result.push(text.substring(charIdx, matchStart));
            }

            if (!isPlainTextMode) {
                result.push(m);
            }

            charIdx = RE_SPLITTEXT.lastIndex;
        }

        let totalLen = text.length;
        if (charIdx < totalLen) {
            result.push(text.substring(charIdx, totalLen));
        }
        return result; // [text,...]
    }

    tagTextToProp(
        text: string,
        prevProp: PropType
    ): { text: string, prop: PropType } {

        let plainText: string,
            innerMatch: RegExpMatchArray;

        if (prevProp == null) {
            prevProp = {};
        }

        // close image tag
        if (prevProp.img) {
            UpdateProp(prevProp, PROP_REMOVE, 'img');
        }
        // Check if current fragment is a class tag
        if (RE_BLOD_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'b', true);
            plainText = '';
        } else if (RE_BLOD_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'b');
            plainText = '';

        } else if (RE_ITALICS_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'i', true);
            plainText = '';
        } else if (RE_ITALICS_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'i');
            plainText = '';

        } else if (RE_SIZE_OPEN.test(text)) {
            innerMatch = text.match(RE_SIZE_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'size', innerMatch[1] + 'px');
            plainText = '';
        } else if (RE_SIZE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'size');
            plainText = '';

        } else if (RE_COLOR_OPEN.test(text)) {
            innerMatch = text.match(RE_COLOR_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'color', innerMatch[1]);
            plainText = '';
        } else if (RE_COLOR_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'color');
            plainText = '';

        } else if (RE_UNDERLINE_OPEN.test(text)) {
            innerMatch = text.match(RE_UNDERLINE_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'u', true);
            plainText = '';
        } else if (RE_UNDERLINE_OPENC.test(text)) {
            innerMatch = text.match(RE_UNDERLINE_OPENC);
            UpdateProp(prevProp, PROP_ADD, 'u', innerMatch[1]);
            plainText = '';
        } else if (RE_UNDERLINE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'u');
            plainText = '';

        } else if (RE_SHADOW_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'shadow', true);
            plainText = '';
        } else if (RE_SHADOW_OPENC.test(text)) {
            innerMatch = text.match(RE_SHADOW_OPENC);
            UpdateProp(prevProp, PROP_ADD, 'shadow', innerMatch[1]);
            plainText = '';
        } else if (RE_SHADOW_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'shadow');
            plainText = '';

        } else if (RE_STROKE_OPEN.test(text)) {
            UpdateProp(prevProp, PROP_ADD, 'stroke', true);
            plainText = '';
        } else if (RE_STROKE_OPENC.test(text)) {
            innerMatch = text.match(RE_STROKE_OPENC);
            UpdateProp(prevProp, PROP_ADD, 'stroke', innerMatch[1]);
            plainText = '';
        } else if (RE_STROKE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'stroke');
            plainText = '';

        } else if (RE_IMAGE_OPEN.test(text)) {
            innerMatch = text.match(RE_IMAGE_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'img', innerMatch[1]);
            plainText = '';
        } else if (RE_IMAGE_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'img');
            plainText = '';

        } else if (RE_AREA_OPEN.test(text)) {
            innerMatch = text.match(RE_AREA_OPEN);
            UpdateProp(prevProp, PROP_ADD, 'area', innerMatch[1]);
            plainText = '';
        } else if (RE_AREA_CLOSE.test(text)) {
            UpdateProp(prevProp, PROP_REMOVE, 'area');
            plainText = '';

        } else {
            plainText = text
        }

        let result = TagTextToPropResult;
        result.text = plainText;
        result.prop = prevProp;
        return result;
    }

    propToStyle(
        defaultStyle: IStyle,
        prop: PropType
    ): IStyle {

        let result = ContextStyleResult;
        if (!prop.hasOwnProperty('img')) {
            result.image = null;

            // TODO
            // if (prop.hasOwnProperty('family')) {
            //     result.fontFamily = prop.family;
            // } else {
            //     result.fontFamily = defaultStyle.fontFamily;
            // }
            result.fontFamily = defaultStyle.fontFamily;

            if (prop.hasOwnProperty('size')) {
                result.fontSize = prop.size;
            } else {
                result.fontSize = defaultStyle.fontSize;
            }
            result.fontStyle = GetFontStyle(prop.b, prop.i);

            result.font = `${result.fontStyle} ${result.fontSize} ${result.fontFamily}`;

            if (prop.hasOwnProperty('color')) {
                result.fillStyle = prop.color;
            } else {
                result.fillStyle = defaultStyle.fillStyle;
            }

            if (prop.hasOwnProperty('stroke')) {
                if (prop.stroke === true) {
                    result.strokeStyle = defaultStyle.strokeStyle;
                    result.strokeThickness = defaultStyle.strokeThickness;
                } else {
                    result.strokeStyle = prop.stroke;
                    result.strokeThickness = defaultStyle.strokeThickness;
                }
            } else {
                result.strokeStyle = defaultStyle.strokeStyle;
                result.strokeThickness = 0;
            }
        } else {
            result.image = prop.img;
        }

        if (prop.hasOwnProperty('shadow')) {
            if (prop.shadow === true) {
                result.shadowColor = defaultStyle.shadowColor;
                result.shadowOffsetX = defaultStyle.shadowOffsetX;
                result.shadowOffsetY = defaultStyle.shadowOffsetY;
                result.shadowBlur = defaultStyle.shadowBlur;
                result.shadowStroke = true;
                result.shadowFill = true;
            } else {
                result.shadowColor = prop.shadow;
                result.shadowOffsetX = defaultStyle.shadowOffsetX;
                result.shadowOffsetY = defaultStyle.shadowOffsetY;
                result.shadowBlur = defaultStyle.shadowBlur;
                result.shadowStroke = true;
                result.shadowFill = true;
            }
        } else {
            result.shadowColor = '#000';
            result.shadowOffsetX = 0;
            result.shadowOffsetY = 0;
            result.shadowBlur = 0;
            result.shadowStroke = false;
            result.shadowFill = false;
        }

        if (prop.hasOwnProperty('u')) {
            if (prop.u === true) {
                result.underlineStyle = defaultStyle.underlineStyle;
                result.underlineThickness = defaultStyle.underlineThickness;
                result.underlineOffsetY = defaultStyle.underlineOffsetY;
            } else {
                result.underlineStyle = prop.u;
                result.underlineThickness = defaultStyle.underlineThickness;
                result.underlineOffsetY = defaultStyle.underlineOffsetY;
            }
        } else {
            result.underlineStyle = '#000';
            result.underlineThickness = 0;
            result.underlineOffsetY = 0;
        }

        return result;
    }

    propToTagText(
        text: string,
        prop: PropType,
        prevProp: PropType
    ): string {

        if (prevProp == null) {
            prevProp = EmptyProp;
        }

        // Close previous tag
        let closedHeaders: string[] = [];
        for (const k in prevProp) {
            if (prop.hasOwnProperty(k)) {
                continue;
            }

            closedHeaders.push(`[/${k}]`);
        }
        text = `${closedHeaders.join()}${text}`;

        let openHeaders: string[] = [];
        for (const k in prop) {
            if (prevProp[k] === prop[k]) {
                continue;
            }

            switch (k) {
                case 'size':
                    const fontSize = prop.size.replace('px', '');
                    openHeaders.push(`[size=${fontSize}]`);
                    break;

                case 'color':
                case 'img':
                case 'area':
                    openHeaders.push(`[${k}=${prop[k]}]`);
                    break;

                case 'stroke':
                case 'u':
                    if (prop[k] === true) {
                        openHeaders.push(`[${k}]`);
                    } else {
                        openHeaders.push(`[${k}=${prop[k]}]`)
                    }
                    break;

                default:
                    openHeaders.push(`[${k}]`);
                    break;
            }
        }

        text = `${text}${openHeaders.join()}`;

        return text;
    }
}

const UpdateProp = function (
    prop: PropType,
    op: boolean,
    key: string,
    value?: any
): PropType {

    if (op === PROP_ADD) {
        // PROP_ADD
        prop[key] = value;
    } else {
        // PROP_REMOVE        
        if (prop.hasOwnProperty(key)) {
            delete prop[key];
        }
    }

    return prop;
};


var GetFontStyle = function (
    isBold: boolean,
    isItalic: boolean
): string {

    if (isBold && isItalic) {
        return 'bold italic';
    } else if (isBold) {
        return 'bold';
    } else if (isItalic) {
        return 'italic';
    } else {
        return '';
    }
};


const TagTextToPropResult: { text: string, prop: PropType } = { text: null, prop: null };
const EmptyProp: PropType = {};

const RE_SPLITTEXT = /\[b\]|\[\/b\]|\[i\]|\[\/i\]|\[size=(\d+)\]|\[\/size\]|\[color=([a-z]+|#[0-9abcdef]+)\]|\[\/color\]|\[u\]|\[u=([a-z]+|#[0-9abcdef]+)\]|\[\/u\]|\[shadow\]|\[shadow=([a-z]+|#[0-9abcdef]+)\]|\[\/shadow\]|\[stroke\]|\[stroke=([a-z]+|#[0-9abcdef]+)\]|\[\/stroke\]|\[img=([^\]]+)\]|\[\/img\]|\[area=([^\]]+)\]|\[\/area\]/ig;

var RE_BLOD_OPEN = /\[b\]/i;
var RE_BLOD_CLOSE = /\[\/b\]/i;
var RE_ITALICS_OPEN = /\[i\]/i;
var RE_ITALICS_CLOSE = /\[\/i\]/i;
var RE_SIZE_OPEN = /\[size=(\d+)\]/i;
var RE_SIZE_CLOSE = /\[\/size\]/i;
var RE_COLOR_OPEN = /\[color=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_COLOR_CLOSE = /\[\/color\]/i;
var RE_UNDERLINE_OPEN = /\[u\]/i;
var RE_UNDERLINE_OPENC = /\[u=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_UNDERLINE_CLOSE = /\[\/u\]/i;
var RE_SHADOW_OPEN = /\[shadow\]/i;
var RE_SHADOW_OPENC = /\[shadow=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_SHADOW_CLOSE = /\[\/shadow\]/i;
var RE_STROKE_OPEN = /\[stroke\]/i;
var RE_STROKE_OPENC = /\[stroke=([a-z]+|#[0-9abcdef]+)\]/i;
var RE_STROKE_CLOSE = /\[\/stroke\]/i;
var RE_IMAGE_OPEN = /\[img=([^\]]+)\]/i;
var RE_IMAGE_CLOSE = /\[\/img\]/i;
var RE_AREA_OPEN = /\[area=([^\]]+)\]/i;
var RE_AREA_CLOSE = /\[\/area\]/i;
const PROP_REMOVE = false;
const PROP_ADD = true;