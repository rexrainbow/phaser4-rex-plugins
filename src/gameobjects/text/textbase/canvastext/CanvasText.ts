import {
    ICanvasText,
    IConfig
} from './ICanvasText';
import {
    StyleType, HAlignMode, VAlignMode,
    WrapMode
} from '../Types';
import { BaseParser } from '../parser/BaseParser';
import { Stack as Pool } from '../../../../utils/struct/Stack';
import { PenManager, PenPoolType } from '../penmanger/PenManager';
import { ImageManager } from '../imagemanager/ImageManager';
import { HitAreaManager } from '../hitareamanager/HitAreaManager';
// import SetInteractive from './SetInteractive';
import { Pen } from '../penmanger/Pen';
import { SetText } from '../penmanger/SetText'

export class CanvasText implements ICanvasText {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;

    defatultStyle: StyleType;
    wrapMode: WrapMode;
    wrapWidth: number;
    lineSpacing: number;
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

        return SetText(penManager, text, this, wrapMode, wrapWidth);
    }

    get startXOffset() {
        let defatultStyle = this.defatultStyle;
        return (defatultStyle.strokeThickness / 2);
    }

    get startYOffset() {
        let defatultStyle = this.defatultStyle;
        return (defatultStyle.strokeThickness / 2);
    }

    get lines() {
        return this.penManager.lines;
    }

    get displayLinesCount() {
        return this.penManager.linesCount;
    }

    get textWidth() {
        return this.penManager.maxLineWidth;
    }

    get textHeight() {
        return this.penManager.totalLineHeight;
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

    getLastPen(
        penManager: PenManager = this.penManager
    ): Pen {

        return penManager.lastPen;
    }
};
