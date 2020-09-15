import {
    ICanvasText,
    IConfig
} from './ICanvasText';
import { IStyle, WrapMode } from '../Types';
import { IBaseText } from '../IBaseText';
import { BaseParser } from '../parser/BaseParser';
import { Stack as Pool } from '../../../../utils/struct/Stack';
import { PenManager, PenPoolType } from '../penmanger/PenManager';
import { Line } from '../penmanger/Line';
import { ImageManager } from '../imagemanager/ImageManager';
import { ImageInfo } from '../imagemanager/IImageManager';
import { HitAreaManager } from '../hitareamanager/HitAreaManager';
// import SetInteractive from './SetInteractive';
import { Pen } from '../penmanger/Pen';
import { UpdatePenManager } from '../penmanger/UpdatePenManager';
import { Draw } from './Draw';

export class CanvasText implements ICanvasText {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;

    parent: IBaseText;

    parser: BaseParser;
    penManager: PenManager;
    _tmpPenManager: PenManager
    penPool: PenPoolType;
    imageManager: ImageManager;
    hitAreaManager: HitAreaManager;

    textScrollX: number = 0;
    textScrollY: number = 0;

    constructor({
        canvas,
        context,
        parent,
        parser,
        penPool = new Pool<Pen>()
    }: IConfig) {

        this.canvas = canvas;
        this.context = context;
        this.parser = parser;
        this.parent = parent;

        this.penPool = penPool;
        this.penManager = new PenManager({
            penPool: penPool
        });
    }

    destroy() {
        this.parser.destroy();

        this.canvas = null;
        this.context = null;
        this.parser = null;
        this.parent = null;

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
        x: number,
        y: number,
        width: number,
        height: number,
        textScrollX: number = 0,
        textScrollY: number = 0
    ): this {

        Draw(this,
            x, y, width, height,
            textScrollX, textScrollY,
            this.penManager
        );

        return this;
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
            this.parent.wrapMode,
            this.parent.wrapWidth,
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
            this.parent.wrapMode,
            this.parent.wrapWidth,
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

    addImageInfo(
        key: string | string[] | { [key: string]: ImageInfo },
        config?: ImageInfo
    ): this {

        if (this.imageManager === undefined) {
            this.imageManager = new ImageManager();
        }

        this.imageManager.add(key, config);
        return this;
    }
};
