import { CanvasTexture } from '@phaserjs/phaser/textures/types/CanvasTexture';
import { GameInstance } from '@phaserjs/phaser/GameInstance';
import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite/Sprite';

import { IBaseText, IConfig, PaddingConfigType } from './IBaseText';
import {
    IStyle, IRadiusConfig,
    FillStyleType,
    WrapMode, WrapModeString,
    HAlignMode, HAlignModeString, VAlignMode, VAlignModeString
} from './Types';
import { CanvasText } from './canvastext/CanvasText';
import { ImageInfo } from './imagemanager/IImageManager';
import { PenManager } from './penmanger/PenManager';
import { BaseParser } from './parser/BaseParser';

import { UpdateText } from './UpdateText';
import { SetFixedSize, SetPadding } from './SetSizeMethods';
import { SetTextOffsetY } from './SetTextOffset';
import { SetHAlign, SetVAlign } from './SetAlignMethods';
import { SetLineSpacing } from './SetLineSpacing';
import { SetBackgroundStyle } from './SetBackgroundStyle';
import {
    SetFont, SetFontFamily, SetFontSize,
    SetFillStyle, SetStrokeStyle, SetShadow
} from './SetFontMethods';
import { SetWrapMode } from './SetWrapMode';
import { SetUnderline } from './SetUnderline';
import { AddImageInfo } from './AddImageInfo';
import { GetWrappedText, GetPlainText, GetText, GetSubString } from './GetTextMethods';
import { ClonePenManager, GetPenManager } from './PenManagerMethods';

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
    strokeThickness: number = 1;

    shadowStroke: boolean = false;
    shadowFill: boolean = false;
    shadowColor: string = '#000';
    shadowBlur: number = 4;
    shadowOffsetX: number = 0;
    shadowOffsetY: number = 0;

    underlineStyle: FillStyleType = '#fff';
    underlineThickness: number = 1;
    underlineOffsetY: number = 0;

    hAlign: HAlignMode = HAlignMode.left;
    vAlign: VAlignMode = VAlignMode.top;
    lineSpacing: number = 0;
    wrapMode: WrapMode = WrapMode.none;
    wrapWidth: number = 0;
    fixedWidth: number = 0;
    fixedHeight: number = 0;
    resolution: number;
    padding = { left: 0, right: 0, top: 0, bottom: 0 };
    _textOffsetY: number = 0;

    constructor(
        x: number,
        y: number,
        text: string | string[] = '',
        {
            width = 0,
            height = 0,
            padding,
            wrapMode = WrapMode.none,

            backgroundFillStyle,
            backgroundStrokeStyle,
            backgroundStrokeThickness,
            cornerRadius = 0,

            hAlign = HAlignMode.left,
            vAlign = VAlignMode.top,

            lineSpacing = 0,

            fontFamily = 'monospace',
            fontSize = '16px',
            fillStyle = '#fff',
            strokeStyle,
            strokeThickness = 1,

            shadowColor = '#000',
            shadowBlur = 4,
            shadowOffsetX = 0,
            shadowOffsetY = 0,
            shadowFill = false,
            shadowStroke = false,

            underlineStyle = '#fff',
            underlineThickness = 1,
            underlineOffsetY = 0,

            images
        }: IConfig = {},
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

        SetFixedSize(this, width, height);

        if (padding) {
            SetPadding(this, padding)
        }

        SetWrapMode(this, wrapMode);

        SetHAlign(this, hAlign);
        SetVAlign(this, vAlign);

        SetLineSpacing(this, lineSpacing);

        SetBackgroundStyle(this,
            backgroundFillStyle,
            backgroundStrokeStyle, backgroundStrokeThickness,
            cornerRadius
        );

        SetFontFamily(this, fontFamily);

        SetFontSize(this, fontSize);

        SetFillStyle(this, fillStyle);

        if (strokeStyle) {
            SetStrokeStyle(this, strokeStyle, strokeThickness);
        }

        SetShadow(this, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY, shadowFill, shadowStroke);

        SetUnderline(this, underlineStyle, underlineThickness, underlineOffsetY);

        if (images) {
            AddImageInfo(this, images);
        }

        this.setText(text);
    }

    destroy(reparentChildren?: IContainer): void {

        this.canvasText.destroy();

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

    setFixedSize(
        width: number,
        height: number
    ): this {

        SetFixedSize(this, width, height);

        return this;
    }

    setPadding(
        left: number | PaddingConfigType,
        right?: number,
        top?: number,
        bottom?: number
    ): this {

        SetPadding(this, left, right, top, bottom);

        return this;
    }

    setTextOffsetY(
        offsetY: number,
        isPercent: boolean = false
    ): this {

        SetTextOffsetY(this, offsetY, isPercent);
        return this;
    }

    setHAlign(
        hAlign: HAlignMode | HAlignModeString = HAlignMode.left
    ): this {

        SetHAlign(this, hAlign);

        return this;
    }

    setVAlign(
        vAlign: VAlignMode | VAlignModeString = VAlignMode.top
    ): this {

        SetVAlign(this, vAlign);

        return this;
    }

    setLineSpacing(
        lineSpacing: number = 0
    ): this {

        SetLineSpacing(this, lineSpacing);

        return this;
    }

    setFont(
        fontFamily: string,
        fontSize: string | number
    ): this {

        SetFont(this, fontFamily, fontSize);

        return this;
    }

    setFillStyle(
        style?: FillStyleType
    ): this {

        SetFillStyle(this, style);

        return this;
    }

    setStrokeStyle(
        style?: FillStyleType,
        thickness: number = 2
    ) {

        SetStrokeStyle(this, style, thickness);

        return this;
    }

    setShadow(
        color: string = '#000',
        blur: number = 5,
        offsetX: number = 0,
        offsetY: number = 0,
        enableFillShadow: boolean = false,
        enableStrokeShadow: boolean = false,
    ): this {

        SetShadow(this, color, blur, offsetX, offsetY, enableFillShadow, enableStrokeShadow);

        return this;
    }

    resize(
        width: number,
        height: number
    ): this {

        SetFixedSize(this, width, height);
        UpdateText(this);

        return this;
    }

    setWrapMode(
        wrapMode: WrapMode | WrapModeString,
        wrapWidth: number = 0
    ): this {

        SetWrapMode(this, wrapMode, wrapWidth);
        return this;
    }

    setUnderline(
        style: FillStyleType,
        thickness: number = 2,
        offsetY: number = 0
    ): this {

        SetUnderline(this, style, thickness, offsetY);
        return this;
    }

    addImageInfo(
        key: string | string[] | { [key: string]: ImageInfo },
        config?: ImageInfo
    ): this {

        AddImageInfo(this, key, config);
        return this;
    }

    getWrappedText(
        text?: string,
        start?: number,
        end?: number
    ): string[] {

        return GetWrappedText(this, text, start, end);
    }

    getPlainText(
        text?: string,
        start?: number,
        end?: number
    ): string {

        return GetPlainText(this, text, start, end);
    }

    getText(
        text?: string,
        start?: number,
        end?: number
    ): string {

        return GetText(this, text, start, end);
    }

    getSubString(
        text?: string,
        start?: number,
        end?: number
    ): string {

        return GetSubString(this, text, start, end);
    }

    clonePenManager(
        penManager?: PenManager
    ): PenManager {

        return ClonePenManager(this, penManager);
    }

    getPenManager(
        text?: string,
        penManager?: PenManager
    ): PenManager {

        return GetPenManager(this, text, penManager);
    }

    get textOffsetY(): number {

        return this._textOffsetY;
    }

    set textOffsetY(value: number) {

        this._textOffsetY = value;
    }

    get totalTextHeight(): number {

        return this.canvasText.textHeight;
    }

    get displayTextHeight(): number {

        const padding = this.padding;
        return this.height - padding.top - padding.bottom;
    }

    get textOffsetYPercentage(): number {

        return -this.textOffsetY / (this.totalTextHeight - this.displayTextHeight);
    }

    set textOffsetYPercentage(value: number) {

        SetTextOffsetY(this, value, true);
    }
}