import { PropType } from '../parser/BaseParser';
import { NewLineMode } from '../Types';
import { Clone } from '../../../../utils/object/Clone';

export class Pen {
    text: string = '';
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;
    prop: PropType = {};
    newLineMode: NewLineMode = NewLineMode.none;
    startIndex: number = 0;

    set(
        text: string = '',
        x: number = 0,
        y: number = 0,
        width: number = 0,
        height: number = 0,
        prop: PropType = {},
        newLineMode: NewLineMode = NewLineMode.none,
        startIndex: number = 0
    ): this {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.prop = prop;
        this.newLineMode = newLineMode;
        this.startIndex = startIndex;

        return this;
    }

    clone(): Pen {

        let result = new Pen();
        result.set(
            this.text,
            this.x, this.y,
            this.width, this.height,
            Clone(this.prop),
            this.newLineMode,
            this.startIndex
        );
        return result;
    }

    get plainText(): string {

        return (this.newLineMode === NewLineMode.raw) ? `${this.text}\n` : this.text;
    }

    get wrapText(): string {

        return (this.newLineMode !== NewLineMode.none) ? `${this.text}\n` : this.text;
    }

    get plainTextLength(): number {

        let len = this.text.length;
        if (this.newLineMode === NewLineMode.raw) {
            len += 1;
        }
        return len;
    }

    get endIndex(): number {

        return this.startIndex + this.plainTextLength;
    }

    get lastX(): number {
        return this.x + this.width;
    }

    get isTextPen(): boolean {

        return (this.text !== '');
    }

    get isImagePen(): boolean {

        return !!this.prop.img;
    }

    get hasAreaMarker(): boolean {

        return !!this.prop.area;
    }
};