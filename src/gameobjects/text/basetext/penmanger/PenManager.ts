import { Stack as Pool } from '../../../../utils/struct/Stack';
import { Line } from './Line';
import { Pen } from './Pen';
import { PropType } from '../parser/BaseParser';
import { NewLineMode } from '../Types';

export type PenPoolType = Pool<Pen>;

export class PenManager {
    pens: Pen[] = [];
    lines: Line[] = [];
    maxLineWidth: number;
    totalLineHeight: number;

    penPool: PenPoolType;

    constructor({
        penPool
    }: { penPool: PenPoolType }) {

        this.pens = []; // all pens
        this.lines = [];

        this.penPool = penPool;
    }

    destroy() {
        this.freePens();
    }

    freePens(): this {

        this.penPool.pushMultiple(this.pens);

        this.lines.forEach((l) => { l.destroy(); });
        this.lines.length = 0;

        this.totalLineHeight = 0;

        return this;
    }

    addTextPen(
        text: string,
        x: number,
        y: number,
        width: number,
        height: number,
        ascent: number,
        prop: PropType,
        newLineMode: NewLineMode = NewLineMode.none
    ): this {

        let pen = this.penPool.pop();
        if (pen == null) {
            pen = new Pen();
        }
        pen.set(text, x, y, width, height, ascent, prop, newLineMode);
        this.addPen(pen);

        return this;
    }

    addImagePen(
        x: number,
        y: number,
        width: number,
        height: number,
        prop: PropType,
    ): this {

        this.addTextPen(null, x, y, width, height, 0, prop, NewLineMode.none);

        return this;
    }

    addNewLinePen(
        newLineMode: NewLineMode
    ): this {

        let lastPen = this.lastPen;
        if (lastPen && (lastPen.newLineMode === NewLineMode.none)) {
            lastPen.newLineMode = newLineMode;
        }

        return this;
    }

    addPen(
        pen: Pen
    ): this {

        let previousPen = this.lastPen;
        if (previousPen == null) {
            pen.startIndex = 0;
        } else {
            pen.startIndex = previousPen.endIndex;
        }
        this.pens.push(pen);

        // Maintan lines
        let line = this.lastLine;
        if (line == null) {
            line = new Line();
            this.lines.push(line);
        }
        line.addPen(pen);

        // New line, add an empty line
        if (pen.newLineMode !== NewLineMode.none) {
            line = new Line();
            this.lines.push(line);
        }

        return this;
    }

    clone(
        targetPenManager?: PenManager
    ): PenManager {

        if (targetPenManager == null) {
            targetPenManager = new PenManager({
                penPool: this.penPool
            });
        }

        targetPenManager.freePens();

        this.pens.forEach((pen) => {
            targetPenManager.addPen(pen.clone());
        })

        return targetPenManager;
    }

    get lastPen(): Pen {

        return this.pens[this.pens.length - 1];
    }

    get lastLine(): Line {

        return this.lines[this.lines.length - 1];
    }

    getLineStartIndex(
        i: number
    ): number {

        if (i >= this.lines.length) {
            return this.getLineEndIndex(i);
        } else {
            let line = this.lines[i];
            if (!line) {
                return 0;
            }
            let firstPen = line.firstPen;
            return (firstPen) ? firstPen.startIndex : 0;
        }
    }

    getLineEndIndex(
        i: number
    ): number {

        let lineCount = this.lines.length
        if (i >= lineCount) {
            i = lineCount - 1;
        }

        for (let li = i; li >= 0; li--) {
            let line = this.lines[li];
            if (line && line.hasPen()) {
                return line.lastPen.endIndex;
            }
        }

        return 0;
    }

    getLineWidth(
        i: number
    ): number {

        let line = this.lines[i];
        return (line) ? line.width : 0; // start from 0
    }

    getLineHeights(
        out: number[] = []
    ): number[] {

        this.lines.forEach(function (line) {
            out.push(line.height);
        })
        return out;
    }

    get lineCount(): number {

        return this.lines.length;
    }

    get plainText() {

        let arr: string[] = [],
            pens = this.pens;
        for (let i = 0, cnt = pens.length; i < cnt; i++) {
            arr.push(pens[i].plainText);
        }

        return arr.join();
    }

    get plainTextLength(): number {

        let l = 0;
        for (let i = 0, cnt = this.pens.length; i < cnt; i++) {
            l += this.pens[i].plainTextLength;
        }

        return l;
    }

    getSliceTagText(
        propToTextCallback: ((text: string, prop: PropType, prevProp: PropType) => string),
        propToTextCallbackScope?: any,
        start: number = 0,
        end?: number,
        wrap: boolean = false
    ): string {

        if (end === undefined) {
            let lastPen = this.lastPen;
            if (!lastPen) {
                return "";
            }

            end = lastPen.endIndex;
        }


        let arr: string[] = [];
        let previousProp: PropType;
        for (var i = 0, len = this.pens.length; i < len; i++) {
            let pen = this.pens[i];
            let penEndIdx = pen.endIndex;
            if (penEndIdx <= start) {
                continue;
            }

            let penTxt = (!wrap) ? pen.plainText : pen.wrapText;
            let currentProp = pen.prop;
            let penStartIdx = pen.startIndex;
            let isInRange = (penStartIdx >= start) && (penEndIdx <= end);
            if (!isInRange) {
                penTxt = penTxt.substring(start - penStartIdx, end - penStartIdx);
            }

            if (propToTextCallbackScope) {
                arr.push(
                    propToTextCallback.call(propToTextCallbackScope, penTxt, currentProp, previousProp)
                )
            } else {
                arr.push(
                    propToTextCallback(penTxt, currentProp, previousProp)
                )
            }

            previousProp = currentProp;
            if (penEndIdx >= end) {
                break;
            }
        }

        return arr.join();
    }
};