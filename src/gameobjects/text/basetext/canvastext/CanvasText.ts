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
import { Line } from '../penmanger/Line';
import { ImageManager } from '../imagemanager/ImageManager';
import { HitAreaManager } from '../hitareamanager/HitAreaManager';
// import SetInteractive from './SetInteractive';
import { Pen } from '../penmanger/Pen';
import { UpdatePenManager } from '../penmanger/UpdatePenManager';
import { Draw } from './Draw';

export class CanvasText implements ICanvasText {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;

    defatultStyle: StyleType;

    parser: BaseParser;
    penManager: PenManager;
    _tmpPenManager: PenManager
    penPool: PenPoolType;
    imageManager: ImageManager;
    hitAreaManager: HitAreaManager;

    constructor({
        canvas,
        context,
        defatultStyle,
        parser,
        penPool = new Pool<Pen>()
    }: IConfig) {

        this.canvas = canvas;
        this.context = context;
        this.parser = parser;
        this.defatultStyle = defatultStyle;

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

    get textWidth() {
        return this.penManager.maxLineWidth;
    }

    get textHeight() {
        return this.penManager.totalLineHeight;
    }

    updatePenManager(
        text: string,
        wrapMode: WrapMode,
        wrapWidth: number,
        penManager: PenManager = this.penManager
    ): PenManager {

        return UpdatePenManager(penManager, text, this, wrapMode, wrapWidth);
    }

    draw(
        startX: number = 0,
        startY: number = 0,
        textWidth: number = this.textWidth,
        textHeight: number = this.textHeight
    ): this {

        Draw(this, startX, startY, textWidth, textHeight, this.penManager);
        return this;
    }

    get startXOffset() {
        let strokeStyle = this.defatultStyle.strokeStyle;
        let strokeThickness = this.defatultStyle.strokeThickness;
        return ((strokeStyle != null) && (strokeThickness != null)) ? (strokeThickness / 2) : 0;
    }

    get startYOffset() {
        let strokeStyle = this.defatultStyle.strokeStyle;
        let strokeThickness = this.defatultStyle.strokeThickness;
        return ((strokeStyle != null) && (strokeThickness != null)) ? (strokeThickness / 2) : 0;
    }

    get lines(): Line[] {
        return this.penManager.lines;
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
            this.defatultStyle.wrapMode,
            this.defatultStyle.wrapWidth,
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
            this.defatultStyle.wrapMode,
            this.defatultStyle.wrapWidth,
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