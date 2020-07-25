import { CanvasTexture } from '@phaserjs/phaser/textures/types/CanvasTexture';
import { GameInstance } from '@phaserjs/phaser/GameInstance';
import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite/Sprite';

import { IBaseText } from './IBaseText';
import {
    IStyle, IRadiusConfig,
    FillStyleType,
    WrapMode,
    HAlignMode, VAlignMode
} from './Types';
import { CanvasText } from './canvastext/CanvasText';
import { BaseParser } from './parser/BaseParser';
import { UpdateText } from './UpdateText';
import { SetBackgroundStyle } from './SetBackgroundStyle';
import { SetFont, SetFontFamily, SetFontSize } from './SetFont';
import { SetFixedSize } from './SetFixedSize';
import { SetPadding } from './SetPadding';

export class BaseText extends Sprite implements IBaseText {

    private _text: string;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    canvasText: CanvasText;

    backgroundFillStyle: FillStyleType;
    backgroundStrokeStyle: FillStyleType;
    backgroundStrokeThickness: number;
    cornerRadius: IRadiusConfig;

    antialias: boolean = false;

    fontFamily: string = 'monospace';
    fontSize: string = '16px';
    fillStyle: FillStyleType = '#fff';
    strokeStyle: FillStyleType;
    strokeThickness: number;

    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    shadowBlur: number;
    shadowStroke: boolean;
    shadowFill: boolean;

    underlineStyle: FillStyleType;
    underlineThickness: number;
    underlineOffset: number;

    halign: HAlignMode = HAlignMode.left;
    valign: VAlignMode = VAlignMode.top;
    lineSpacing: number = 0;
    wrapMode: WrapMode = WrapMode.none;
    wrapWidth: number = 0;
    fixedWidth: number = 0;
    fixedHeight: number = 0;
    resolution: number;
    padding = { left: 0, right: 0, top: 0, bottom: 0 };

    constructor(
        x: number,
        y: number,
        text: string | string[] = '',
        {
            backgroundFillStyle,
            backgroundStrokeStyle,
            backgroundStrokeThickness,
            cornerRadius = 0,
            fontStyle,
            fontFamily,
            fontSize,
            fillStyle,
            strokeStyle
        }: IStyle = {},
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
            parent: this,
            parser: parser
        });

        SetBackgroundStyle(this, backgroundFillStyle, backgroundStrokeStyle, backgroundStrokeThickness, cornerRadius);

        if (fontFamily) {
            SetFontFamily(this, fontFamily);
        }
        if (fontSize) {
            SetFontSize(this, fontSize);
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

    updateText(): this {

        UpdateText(this);

        return this;
    }

    get text(): string {

        return this._text;
    }

    set text(value: string) {

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

    setBackgroundStyle(
        fillStyle: FillStyleType,
        strokeStyle: FillStyleType,
        strokeThickness: number = 2,
        radius: IRadiusConfig | number = 0
    ): this {

        SetBackgroundStyle(this, fillStyle, strokeStyle, strokeThickness, radius);
        return this;
    }

    setFont(
        fontFamily: string,
        fontSize: string | number
    ): this {

        SetFont(this, fontFamily, fontSize);

        return this;
    }

    setFixedSize(
        width: number,
        height: number
    ): this {

        SetFixedSize(this, width, height);

        return this;
    }

    setPadding(
        left: number,
        right: number = left,
        top: number = left,
        bottom: number = left
    ): this {

        SetPadding(this, left, right, top, bottom);

        return this;
    }
}