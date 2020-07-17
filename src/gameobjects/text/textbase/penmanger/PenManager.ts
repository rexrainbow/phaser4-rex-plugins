import { Stack as Pool } from '../../../../utils/struct/Stack';
import { Pen } from './Pen';
import { GetEmptyArray, FreeEmptyArrays } from '../../../../utils/pool/EmptyArray';
import { PropType } from '../parser/BaseParser';
import { NewLineMode } from '../Types'
import { Clone } from '../../../../utils/object/Clone';

export class PenManager {
    pens: Pen[] = [];
    lines: Pen[][] = [];
    maxLinesWidth: number;

    penPool: Pool<Pen>;

    constructor({
        pensPool
    }: { pensPool: Pool<Pen> }) {

        this.pens = []; // all pens
        this.lines = []; // pens in lines [ [],[],[],.. ]
        this.maxLinesWidth = undefined;

        this.penPool = pensPool;
    }

    destroy() {
        this.freePens();
    }

    freePens(): this {

        this.penPool.pushMultiple(this.pens);

        this.lines.forEach((l) => { l.length = 0 });
        FreeEmptyArrays(this.lines);
        this.lines.length = 0;

        this.maxLinesWidth = undefined;

        return this;
    }

    addTextPen(
        text: string = '',
        x: number = 0,
        y: number = 0,
        width: number = 0,
        prop: PropType = {},
        newLineMode: NewLineMode = NewLineMode.none
    ): this {

        let pen = this.penPool.pop();
        if (pen == null) {
            pen = new Pen();
        }
        pen.set(text, x, y, width, prop, newLineMode);
        this.addPen(pen);

        return this;
    }

    addImagePen(
        x: number = 0,
        y: number = 0,
        width: number = 0,
        prop: PropType = {},
    ): this {

        this.addTextPen('', x, y, width, prop, NewLineMode.none);

        return this;
    }

    addNewLinePen(): this {

        let previousPen = this.lastPen;
        let x = (previousPen) ? previousPen.lastX : 0;
        let y = (previousPen) ? previousPen.y : 0;
        let prop = (previousPen) ? Clone(previousPen.prop) : {};
        this.addTextPen('', x, y, 0, prop, NewLineMode.wrapped);

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
            line = GetEmptyArray() || [];
            this.lines.push(line);
        }
        line.push(pen);

        // new line, add an empty line
        if (pen.newLineMode !== NewLineMode.none) {
            line = GetEmptyArray() || [];
            this.lines.push(line);
        }
        this.maxLinesWidth = undefined;

        return this;
    }

    clone(
        targetPenManager?: PenManager
    ): PenManager {

        if (targetPenManager == null) {
            targetPenManager = new PenManager({
                pensPool: this.penPool
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

    get lastLine(): Pen[] {

        return this.lines[this.lines.length - 1];
    }

    getLineStartIndex(
        i: number
    ): number {

        if (i >= this.lines.length) {
            return this.getLineEndIndex(i);
        } else {
            let line = this.lines[i];
            return (line && line[0]) ? line[0].startIndex : 0;
        }
    }

    getLineEndIndex(
        i: number
    ): number {

        if (i >= this.lines.length) {
            i = this.lines.length - 1;
        }
        let hasLastPen = false,
            line: Pen[];
        for (let li = i; li >= 0; li--) {
            line = this.lines[li];
            hasLastPen = (line != null) && (line.length > 0);
            if (hasLastPen) {
                break;
            }
        }
        if (!hasLastPen) {
            return 0;
        }

        let lastPen = line[line.length - 1];
        return lastPen.endIndex;
    }

    getLineWidth(
        i: number
    ): number {

        let line = this.lines[i];
        if (!line) {
            return 0;
        }

        let lastPen = line[line.length - 1];
        if (lastPen == null) {
            return 0;
        }

        return lastPen.lastX; // start from 0
    }

    getMaxLineWidth(): number {

        if (this.maxLinesWidth !== undefined) {
            return this.maxLinesWidth;
        }

        let maxW = 0;
        for (let i = 0, cnt = this.lines.length; i < cnt; i++) {
            let w = this.getLineWidth(i);
            if (w > maxW) {
                maxW = w;
            }
        }
        this.maxLinesWidth = maxW;
        return maxW;
    }

    getLineWidths(): number[] {

        var result = [];
        for (var i = 0, cnt = this.lines.length; i < cnt; i++) {
            result.push(this.getLineWidth(i));
        }
        return result;
    }

    get linesCount(): number {

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
            if (lastPen == null) {
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