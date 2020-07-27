import { ISprite } from '@phaserjs/phaser/gameobjects/sprite/ISprite';
import { CanvasText } from './canvastext/CanvasText';
import {
    IStyle,
    FillStyleType, IRadiusConfig,
    WrapMode, HAlignMode, HAlignModeString, VAlignMode, VAlignModeString
} from './Types';
import { ImageInfo } from './imagemanager/IImageManager';

export type PaddingConfigType = {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number
};


export interface IConfig extends IStyle {
    width?: number;
    height?: number;
    padding?: PaddingConfigType | number;
    hAlign?: HAlignMode | HAlignModeString;
    vAlign?: VAlignMode | VAlignModeString;
    lineSpacing?: number;
    images?: string[] | { [key: string]: ImageInfo }
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

    shadowStroke: boolean;
    shadowFill: boolean;
    shadowColor: string;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;

    underlineStyle: FillStyleType;
    underlineThickness: number;
    underlineOffsetY: number;

    hAlign: HAlignMode;
    vAlign: VAlignMode;
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