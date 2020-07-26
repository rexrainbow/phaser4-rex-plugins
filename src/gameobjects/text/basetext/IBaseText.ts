import { ISprite } from '@phaserjs/phaser/gameobjects/sprite/ISprite';
import { CanvasText } from './canvastext/CanvasText';
import {
    IStyle,
    FillStyleType, IRadiusConfig,
    WrapMode, HAlignMode, VAlignMode
} from './Types';

export type PaddingConfigType = {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number
};


export interface IConfig extends IStyle {
    padding?: PaddingConfigType | number;
}

export interface IBaseText extends ISprite {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    canvasText: CanvasText;
    text: string;

    backgroundFillStyle: FillStyleType;
    backgroundStrokeStyle: FillStyleType;
    backgroundStrokeThickness: number;
    cornerRadius: IRadiusConfig | number;

    antialias: boolean;

    fontFamily: string;
    fontSize: string;
    fillStyle: FillStyleType;

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

    halign: HAlignMode;
    valign: VAlignMode;
    lineSpacing: number;
    wrapMode: WrapMode;
    wrapWidth: number;
    fixedWidth: number;
    fixedHeight: number;
    resolution: number;
    padding: {
        left: number,
        right: number,
        top: number,
        bottom: number
    }

}