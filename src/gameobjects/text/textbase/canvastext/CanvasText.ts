import {
    ICanvasText,
    IConfig
} from './ICanvasText';
import {
    StyleType, HAlignMode, VAlignMode,
    WrapMode
} from '../Types';
import { BaseParser, PropType } from '../parser/BaseParser';
import { Stack as Pool } from '../../../../utils/struct/Stack';
import { PenManager, PenPoolType } from '../penmanger/PenManager';
import { ImageManager } from '../imagemanager/ImageManager';
import { HitAreaManager } from '../hitareamanager/HitAreaManager';
import { Draw } from './Draw';
// import SetInteractive from './SetInteractive';
import { WrapText, LineInfo, NewLineMode } from '../../../../utils/string/WrapText';
import { SyncFont, SyncShadow, SyncStyle } from './SyncContextMethods';
import { Clone } from '../../../../utils/object/Clone';
import { Pen } from '../penmanger/Pen';

export class CanvasText implements ICanvasText {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;

    defatultStyle: StyleType;
    wrapMode: WrapMode;
    wrapWidth: number;
    lineSpacing: number;
    maxLines: number;
    halign: HAlignMode;
    valign: VAlignMode;

    parser: BaseParser;
    penManager: PenManager;
    _tmpPenManager: PenManager
    penPool: PenPoolType;
    imageManager: ImageManager;
    hitAreaManager: HitAreaManager;

    constructor({
        canvas,
        context,
        parser,
        penPool = new Pool<Pen>()
    }: IConfig) {

        this.canvas = canvas;
        this.context = context;
        this.parser = parser;
        this.defatultStyle = null; // TODO

        this.penPool = penPool;
        this.penManager = new PenManager({
            penPool: penPool
        });
    }

    destroy() {
        this.canvas = null;
        this.context = null;
        this.parser = null;
        this.defatultStyle = null;

        if (this.penManager) {
            this.penManager.destroy();
            this.penManager = null;
        }
        if (this._tmpPenManager) {
            this._tmpPenManager.destroy();
            this._tmpPenManager = null;
        }
        if (this.imageManager) {
            this.imageManager.destroy();
            this.imageManager = null;
        }
        if (this.hitAreaManager) {
            this.hitAreaManager.destroy();
            this.hitAreaManager = null;
        }
    }

    updatePenManager(
        text: string,
        wrapMode: WrapMode,
        wrapWidth: number,
        penManager: PenManager = this.penManager
    ): PenManager {

        penManager.freePens();
        if (text === "") {
            return penManager;
        }

        let canvas = this.canvas,
            context = this.context,
            defatultStyle = this.defatultStyle;

        let cursorX = 0;

        let match = this.parser.splitText(text),
            curProp: PropType,
            wrapLines: LineInfo[];
        for (var i = 0, len = match.length; i < len; i++) {
            let result = this.parser.tagTextToProp(match[i], curProp);
            let plainText = result.text;
            curProp = result.prop;

            if (curProp.img) { // Image tag                
                let imgWidth = (this.imageManager) ? this.imageManager.getOuterWidth(curProp.img) : 0;
                let imgHeight = (this.imageManager) ? this.imageManager.getOuterHeight(curProp.img) : 0;
                if ((wrapWidth > 0) && (wrapMode !== WrapMode.none)) {  // Wrap mode
                    if (wrapWidth < (cursorX + imgWidth)) { // Image at next new line
                        penManager.addNewLinePen();
                        cursorX = 0;
                    }
                }
                penManager.addImagePen(cursorX, 0, imgWidth, imgHeight, Clone(curProp));
                cursorX += imgWidth;

            } else if (plainText !== '') {
                // wrap text to lines
                // Save the current context.
                context.save();
                let curStyle = this.parser.propToStyle(
                    defatultStyle,
                    curProp
                );
                SyncFont(context, curStyle);
                SyncStyle(context, curStyle);
                wrapLines = WrapText(plainText, GetTextWidth, context, wrapMode, wrapWidth, cursorX);

                // Get text height of wrapped lines
                let textHeight = GetTextHeight(context) + curStyle.strokeThickness;

                // add pens
                for (let j = 0, jcnt = wrapLines.length; j < jcnt; j++) {
                    let n = wrapLines[j];
                    penManager.addTextPen(
                        n.text,
                        cursorX, 0,
                        n.width, textHeight,
                        Clone(curProp),
                        n.newLineMode
                    );

                    if (n.newLineMode !== NewLineMode.none) {
                        cursorX = 0;
                    } else {
                        cursorX += n.width;
                    }

                }

                context.restore();
            }

        };

        let lineSpacing = this.lineSpacing;
        let currLineHeight = 0,
            cursorY = 0;
        penManager.lines.forEach((line) => {
            line.pens.forEach((pen) => {
                pen.y += cursorY;
                currLineHeight = Math.max(currLineHeight, pen.height);
            })
            line.setHeight(currLineHeight);
            cursorY += (currLineHeight + lineSpacing);
            currLineHeight = 0
        })

        return penManager;
    }

    get startXOffset() {
        let defatultStyle = this.defatultStyle;
        return (defatultStyle.strokeThickness / 2);
    }

    get startYOffset() {
        let defatultStyle = this.defatultStyle;
        return (defatultStyle.strokeThickness / 2) + defatultStyle.metrics.ascent;
    }

    get lines() {
        return this.penManager.lines;
    }

    get displayLinesCount() {
        let linesCount = this.penManager.linesCount,
            maxLines = this.maxLines;
        if ((maxLines > 0) && (linesCount > maxLines)) {
            linesCount = maxLines;
        }
        return linesCount;
    }

    get textWidth() {
        return this.penManager.getMaxLineWidth();
    }

    get textHeight() {
        let linesCount = this.displayLinesCount;
        let textHeight = (this.defatultStyle.lineHeight * linesCount);
        if (linesCount > 0) {
            textHeight -= this.lineSpacing;
        }
        return textHeight;
    }

    get tmpPenManager() {
        if (this._tmpPenManager === null) {
            this._tmpPenManager = new PenManager({
                penPool: this.penPool
            });
        }
        return this._tmpPenManager;
    }

    getPlainText(
        text?: string,
        start?: number,
        end?: number
    ): string {

        let plainText: string;
        if (text == null) {
            plainText = this.penManager.plainText;
        } else {
            plainText = this.parser.splitText(text, true).join('');
        }

        if ((start != null) || (end != null)) {
            if (start == null) {
                start = 0;
            }
            if (end == null) {
                end = plainText.length;
            }
            plainText = plainText.substring(start, end);
        }

        return plainText;
    }

    getPenManager(
        text?: string,
        retPenManager?: PenManager
    ): PenManager {

        if (text === undefined) {
            return this.clonePenManager(retPenManager, this.penManager);
        }

        if (retPenManager === undefined) {
            retPenManager = new PenManager({
                penPool: this.penPool
            });
        }

        this.updatePenManager(
            text,
            this.wrapMode,
            this.wrapWidth,
            retPenManager
        );
        return retPenManager;
    }

    getText(
        text?: string,
        start?: number,
        end?: number,
        wrap?: boolean
    ): string {

        if (text == null) {
            return this.penManager.getSliceTagText(
                this.parser.propToTagText,
                this.parser,
                start, end, wrap);
        }

        let penManager = this.tmpPenManager;
        this.updatePenManager(
            text,
            this.wrapMode,
            this.wrapWidth,
            penManager
        );

        return penManager.getSliceTagText(
            this.parser.propToTagText,
            this.parser,
            start, end, wrap);
    }

    clonePenManager(
        ret: PenManager,
        src: PenManager = this.penManager
    ): PenManager {

        return src.clone(ret);
    }

    getTextWidth(
        penManager: PenManager = this.penManager
    ): number {

        return penManager.getMaxLineWidth();
    }

    getLastPen(
        penManager: PenManager = this.penManager
    ): Pen {

        return penManager.lastPen;
    }
};

function GetTextWidth(text: string, context: CanvasRenderingContext2D): number {
    return context.measureText(text).width;
}

function GetTextHeight(context: CanvasRenderingContext2D): number {
    let metrics = context.measureText('|MÉq');
    return Math.ceil(Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent));
}