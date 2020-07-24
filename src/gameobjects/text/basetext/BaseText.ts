import { CanvasTexture } from '@phaserjs/phaser/textures/types/CanvasTexture';
import { DIRTY_CONST } from '@phaserjs/phaser/gameobjects/DIRTY_CONST';
import { GameInstance } from '@phaserjs/phaser/GameInstance';
import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite/Sprite';
import {
    StyleType, FillStyleType,
    WrapMode,
    HAlignMode, HAlignModeString, VAlignMode, VAlignModeString
} from './Types';
import { CanvasText } from './canvastext/CanvasText';
import { BaseParser } from './parser/BaseParser';

export class BaseText extends Sprite implements StyleType {

    private _text: string;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;
    padding = { left: 0, right: 0, top: 0, bottom: 0 };
    canvasText: CanvasText;

    backgroundStyle: FillStyleType;

    antialias: boolean = false;

    font: string = '16px monospace';
    fillStyle: FillStyleType = '#fff';
    strokeStyle: FillStyleType;
    strokeThickness: number;

    lineSpacing: number = 0;
    halign: HAlignMode = HAlignMode.left;
    valign: VAlignMode = VAlignMode.top;
    wrapMode: WrapMode = WrapMode.word;
    wrapWidth: number = 0;
    fixedWidth: number = 0;
    fixedHeight: number = 0;

    constructor(
        x: number,
        y: number,
        text: string | string[] = '',
        font?: string,
        fillStyle?: FillStyleType,
        parser?: BaseParser
    ) {

        super(x, y, CanvasTexture());

        this.type = 'rexText';

        const game = GameInstance.get();

        this.resolution = game.renderer.resolution;

        this.canvas = this.texture.image as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');

        this.canvasText = new CanvasText({
            canvas: this.canvas,
            context: this.context,
            defatultStyle: this,
            parser: parser
        });

        if (font) {
            this.font = font;
        }

        if (fillStyle) {
            this.fillStyle = fillStyle;
        }

        this.setText(text);
    }

    destroy(reparentChildren?: IContainer): void {

        this.texture.destroy();

        this.canvas = null;
        this.context = null;

        super.destroy(reparentChildren);
    }

    updateText(value?: string | string[]): this {

        let canvasText = this.canvasText;
        this.canvasText.updatePenManager(
            this._text,
            this.wrapMode,
            this.wrapWidth
        );

        // Resize
        let padding = this.padding;
        let textWidth: number,
            textHeight: number,
            displayWidth: number,
            displayHeight: number;
        if (this.fixedWidth === 0) {
            textWidth = canvasText.textWidth;
            displayWidth = textWidth + padding.left + padding.right;
        }
        else {
            displayWidth = this.fixedWidth;
            textWidth = displayWidth - padding.left - padding.right;
            if (textWidth < canvasText.textWidth) {
                textWidth = canvasText.textWidth;
            }
        }
        if (this.fixedHeight === 0) {
            textHeight = canvasText.textHeight;
            displayHeight = textHeight + padding.top + padding.bottom;
        }
        else {
            displayHeight = this.fixedHeight;
            textHeight = displayHeight - padding.top - padding.bottom;
            if (textHeight < canvasText.textHeight) {
                textHeight = canvasText.textHeight;
            }
        }

        let resolution = this.resolution;
        let canvasWidth = Math.ceil(displayWidth * resolution);
        let canvasHeight = Math.ceil(displayHeight * resolution);
        let canvas = this.canvas;
        if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            this.texture.setSize(displayWidth, displayHeight);
            this.setSize(displayWidth, displayHeight);
        }

        // Draw content on canvas
        let context = this.context;
        context.save();
        context.scale(resolution, resolution);

        canvasText.draw(
            padding.left,
            padding.top,
            textWidth,
            textHeight
        );

        context.restore();

        // Update texture
        if (this.texture.binding) {
            this.texture.binding.update();
        }

        this.setDirty(DIRTY_CONST.TEXTURE);

        return this;
    }

    get text(): string | string[] {

        return this._text;
    }

    set text(value: string | string[]) {

        this.setText(value);
    }

    setText(
        value: string | string[] = '',
        updateTexture: boolean = true
    ): this {

        if (Array.isArray(value)) {
            value = value.join('\n');
        }

        if (value !== this._text) {
            this._text = value.toString();

            if (updateTexture) {
                this.updateText();
            }
        }
        return this;
    }

    setFixedSize(
        width: number,
        height: number
    ): this {

        this.fixedWidth = width;
        this.fixedHeight = height;
        return this;
    }
}