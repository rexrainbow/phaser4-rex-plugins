import { CanvasTexture } from '@phaserjs/phaser/textures/types/CanvasTexture';
import { GameInstance } from '@phaserjs/phaser/GameInstance';
import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite/Sprite';

import { IBaseText, IConfig, PaddingConfigType } from './IBaseText';
import {
    IStyle, IRadiusConfig,
    FillStyleType,
    WrapMode, WrapModeString,
    HAlignMode, VAlignMode
} from './Types';
import { CanvasText } from './canvastext/CanvasText';
import { ImageInfo } from './imagemanager/IImageManager';
import { PenManager } from './penmanger/PenManager';
import { BaseParser } from './parser/BaseParser';

import { UpdateText } from './UpdateText';
import { SetBackgroundStyle } from './SetBackgroundStyle';
import { SetPadding } from './SetPadding';
import {
    SetFont, SetFontFamily, SetFontSize,
    SetFillStyle, SetStrokeStyle, SetShadow
} from './SetFontMethods';
import { SetFixedSize } from './SetFixedSize';
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
            padding,

            fontFamily,
            fontSize,
            fillStyle,
            strokeStyle,
            strokeThickness = 1,

            underlineStyle,
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

        SetBackgroundStyle(this, backgroundFillStyle, backgroundStrokeStyle, backgroundStrokeThickness, cornerRadius);

        if (padding) {
            SetPadding(this, padding)
        }

        if (fontFamily) {
            SetFontFamily(this, fontFamily);
        }
        if (fontSize) {
            SetFontSize(this, fontSize);
        }

        if (fillStyle) {
            SetFillStyle(this, fillStyle);
        }

        if (strokeStyle) {
            SetStrokeStyle(this, strokeStyle, strokeThickness);
        }

        if (underlineStyle) {
            SetUnderline(this, underlineStyle, underlineThickness, underlineOffsetY);
        }

        if (images) {
            AddImageInfo(this, images);
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

    setPadding(
        left: number | PaddingConfigType,
        right?: number,
        top?: number,
        bottom?: number
    ): this {

        SetPadding(this, left, right, top, bottom);

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
        enableFillShadow: boolean,
        enableStrokeShadow: boolean,
        color: string = '#000',
        blur: number = 5,
        offsetX: number = 0,
        offsetY: number = 0
    ): this {

        SetShadow(this, enableFillShadow, enableStrokeShadow, color, blur, offsetX, offsetY);

        return this;
    }

    setFixedSize(
        width: number,
        height: number
    ): this {

        SetFixedSize(this, width, height);

        return this;
    }

    resize(
        width: number,
        height: number
    ): this {

        SetFixedSize(this, width, height);

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
}