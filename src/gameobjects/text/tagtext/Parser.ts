import {
    BaseParser,
    TagTextToPropResult,
    ContextStyleResult
} from '../basetext/parser/BaseParser';
import { IStyle } from '../basetext/Types';

type FontStyleTypeString = '' | 'bold' | 'italic' | 'bold italic' | 'italic bold'

type StrokeStyleType = {
    color?: string,
    thinkness?: number
}

type ShadowType = {
    color?: string,
    blur?: number,
    offsetX?: number,
    offsetY?: number
}

type UnderlineType = {
    color?: string,
    thinkness?: number,
    offset?: number
}

export type PropType = {

    family?: string,
    fontFamily?: string,
    'font-family'?: string,

    size?: string | number,
    fontSize?: string | number,
    'font-size'?: string | number,

    style?: FontStyleTypeString,
    fontStyle?: FontStyleTypeString,
    'font-style'?: FontStyleTypeString,

    color?: string,
    'font-color'?: string,

    stroke?: StrokeStyleType,

    shadow?: ShadowType,

    u?: UnderlineType,

    underline?: UnderlineType,

    img?: string,

    _class?: string,
    _style?: string
}


export class Parser extends BaseParser {
    tags: Map<string, PropType>;

    constructor(
        tags?: { [name: string]: PropType }
    ) {

        super();

        this.tags = new Map();

        if (tags) {
            for (const name in tags) {
                this.addTag(name, tags[name]);
            }
        }
    }

    destroy() {
        this.tags.clear();
    }

    addTag(
        name: string,
        prop: PropType
    ): this {

        this.tags.set(name, prop);

        return this;
    }

    isTextTag(
        name: string
    ): boolean {

        const tag = this.tags.get(name);
        if (tag) {
            return (tag.img == null);
        } else {
            return false;
        }
    }

    splitText(
        text: string,
        isPlainTextMode: boolean = false
    ): string[] {

        const result: string[] = [];
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
            } else { // isPlainTextMode
                if (RE_CLASS_HEADER.test(m)) {
                    const innerMatch = m.match(RE_CLASS);
                    result.push(innerMatch[2]);
                } else if (RE_STYLE_HEADER.test(m)) {
                    const innerMatch = m.match(RE_STYLE);
                    result.push(innerMatch[2]);
                }
            }

            charIdx = RE_SPLITTEXT.lastIndex;
        }

        const totalLen = text.length;
        if (charIdx < totalLen) {
            result.push(text.substring(charIdx, totalLen));
        }
        return result;
    }

    tagTextToProp(
        text: string,
        prevProp: PropType
    ): { text: string, prop: PropType } {

        let plainText: string,
            propOut: PropType;
        if (RE_CLASS_HEADER.test(text)) {
            const innerMatch = text.match(RE_CLASS);
            if (innerMatch != null) {
                const name = innerMatch[1];
                const tags = this.tags;
                if (tags.has(name)) {
                    propOut = tags.get(name);
                } else {
                    propOut = {};
                }
                propOut._class = name;
                plainText = innerMatch[2];
            }
        } else if (RE_STYLE_HEADER.test(text)) {
            const innerMatch = text.match(RE_STYLE);
            if (innerMatch != null) {
                const style = innerMatch[1];
                propOut = StyleToProp(style);
                propOut._style = style;
                plainText = innerMatch[2];
            }
        }

        if (plainText === undefined) {
            plainText = text;
        }

        if (propOut === undefined) {
            propOut = {};
        }

        const result = TagTextToPropResult;
        result.text = plainText;
        result.prop = propOut;
        return result;
    }

    propToStyle(
        defaultStyle: IStyle,
        prop: PropType
    ): IStyle {

        const result = ContextStyleResult;
        if (!prop.hasOwnProperty('img')) {
            result.image = null;

            if (prop.hasOwnProperty('family') || prop.hasOwnProperty('fontFamily') || prop.hasOwnProperty('font-family')) {
                const family = (prop.hasOwnProperty('family')) ? prop.family :
                    (prop.hasOwnProperty('fontFamily')) ? prop.fontFamily :
                        prop['font-family'];
                result.fontFamily = family;
            } else {
                result.fontFamily = defaultStyle.fontFamily;
            }

            if (prop.hasOwnProperty('size') || prop.hasOwnProperty('fontSize') || prop.hasOwnProperty('font-size')) {
                let size = (prop.hasOwnProperty('size')) ? prop.size :
                    (prop.hasOwnProperty('fontSize')) ? prop.fontSize :
                        prop['font-size'];
                if (typeof (size) === 'number') {
                    size = `${size}px`
                }
                result.fontSize = size;
            } else {
                result.fontSize = defaultStyle.fontSize;
            }

            if (prop.hasOwnProperty('style') || prop.hasOwnProperty('fontStyle') || prop.hasOwnProperty('font-style')) {
                const fontStyle = (prop.hasOwnProperty('style')) ? prop.style :
                    (prop.hasOwnProperty('fontStyle')) ? prop.fontStyle :
                        prop['font-style'];
                result.fontStyle = fontStyle;
            } else {
                result.fontStyle = '';
            }

            result.font = `${result.fontStyle} ${result.fontSize} ${result.fontFamily}`;

            if (prop.hasOwnProperty('color') || prop.hasOwnProperty('font-color')) {
                const color = (prop.color) ? prop.color : prop['font-color'];
                result.fillStyle = color;
            } else {
                result.fillStyle = defaultStyle.fillStyle;
            }

            if (prop.hasOwnProperty('stroke')) {
                const stroke = prop.stroke; // {color, thinkness}
                result.strokeStyle = (stroke.hasOwnProperty('color')) ? stroke.color : defaultStyle.strokeStyle;
                result.strokeThickness = (stroke.hasOwnProperty('thinkness')) ? stroke.thinkness : defaultStyle.strokeThickness;
            } else {
                result.strokeStyle = defaultStyle.strokeStyle;
                result.strokeThickness = defaultStyle.strokeThickness;
            }
        } else {
            result.image = prop.img;
        }

        if (prop.hasOwnProperty('shadow')) {
            const shadow = prop.shadow; // {color, blur, offsetX, offsetY}
            result.shadowColor = (shadow.hasOwnProperty('color')) ? shadow.color : defaultStyle.shadowColor;
            result.shadowOffsetX = (shadow.hasOwnProperty('offsetX')) ? shadow.offsetX : defaultStyle.shadowOffsetX;
            result.shadowOffsetY = (shadow.hasOwnProperty('offsetY')) ? shadow.offsetY : defaultStyle.shadowOffsetY;
            result.shadowBlur = (shadow.hasOwnProperty('blur')) ? shadow.blur : defaultStyle.shadowBlur;
            result.shadowStroke = true;
            result.shadowFill = true;
        } else {
            result.shadowColor = defaultStyle.shadowColor;
            result.shadowOffsetX = defaultStyle.shadowOffsetX;
            result.shadowOffsetY = defaultStyle.shadowOffsetY;
            result.shadowBlur = defaultStyle.shadowBlur;
            result.shadowStroke = defaultStyle.shadowStroke;
            result.shadowFill = defaultStyle.shadowFill;
        }

        if (prop.hasOwnProperty('u') || prop.hasOwnProperty('underline')) {
            const u = (prop.u) ? prop.u : prop.underline; // {color, thinkness, offset}
            result.underlineStyle = (u.hasOwnProperty('color')) ? u.color : defaultStyle.underlineStyle;
            result.underlineThickness = (u.hasOwnProperty('thinkness')) ? u.thinkness : defaultStyle.underlineThickness;
            result.underlineOffsetY = (u.hasOwnProperty('offset')) ? u.offset : defaultStyle.underlineOffsetY;
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

        if (prop.hasOwnProperty('_class')) { // class mode

            if (text === '') {
                if (this.isTextTag(prop._class)) {
                    return '';
                }
            }
            return `<class=${prop._class}>${text}</class>`;

        } else if (prop.hasOwnProperty('_style')) { // class mode

            return `<style=${prop._style}>${text}</style>`;
        }
    }
}


function StyleToProp(
    s: string
): PropType {

    const sArr = s.split(";");

    const result: PropType = {};
    for (var i = 0, slen = sArr.length; i < slen; i++) {
        const [name, valueString] = sArr[i].split(":");
        if (IsEmpty(name) || IsEmpty(valueString)) {
            continue;
        }

        if (name === 'stroke') {

            const stroke = valueString.split(' '); // stroke:blue 1px
            const value: StrokeStyleType = {};
            const plen = stroke.length;
            if (plen >= 1) {
                value.color = stroke[0];
            }
            if (plen >= 2) {
                value.thinkness = parseInt(stroke[1].replace('px', ''));
            }
            result.stroke = value;

        } else if (name === 'shadow') {

            const shadow = valueString.split(' '); // shadow:blue 2px 2px 2px
            const value: ShadowType = {};
            const plen = shadow.length;
            if (plen >= 1) {
                value.color = shadow[0];
            }
            if (plen >= 2) {
                value.offsetX = parseInt(shadow[1].replace('px', ''));
            }
            if (plen >= 3) {
                value.offsetY = parseInt(shadow[2].replace('px', ''));
            }
            if (plen >= 4) {
                value.blur = parseInt(shadow[3].replace('px', ''));
            }
            result.shadow = value;

        } else if ((name === 'u') || (name === 'underline')) {

            const u = valueString.split(' ');
            const value: UnderlineType = {};
            const plen = u.length;
            if (plen >= 1) {
                value.color = u[0];
            }
            if (plen >= 2) {
                value.thinkness = parseInt(u[1].replace('px', ''));
            }
            if (plen >= 3) {
                value.offset = parseInt(u[2].replace('px', ''));
            }
            result[name] = value;

        } else {

            result[name] = valueString;
        }
    }
    return result;
};

function IsEmpty(
    s: string
): boolean {

    // Remove white spaces.
    s = s.replace(RE_SPACE, '');
    return (s.length === 0);
};

const RE_SPLITTEXT = /<\s*class=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/class\s*\>|<\s*style=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/style\s*\>/g;
const RE_CLASS_HEADER = /<\s*class=/i;
const RE_CLASS = /<\s*class=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/class\s*\>/;
const RE_STYLE_HEADER = /<\s*style=/i;
const RE_STYLE = /<\s*style=["|']([^"|']+)["|']\s*\>([\s\S]*?)<\s*\/style\s*\>/;
const RE_SPACE = /^\s+|\s+$/;
