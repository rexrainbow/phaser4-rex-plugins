import { StyleType, HAlignMode, VAlignMode } from '../Types';
import { WrapMode } from '../Types';
import { BaseParser } from '../parser/BaseParser';
import { PenManager, PenPoolType } from '../penmanger/PenManager';
import { ImageManager } from '../imagemanager/ImageManager';
import { HitAreaManager } from '../hitareamanager/HitAreaManager'

export interface IConfig {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    parser: BaseParser;
    penPool: PenPoolType;
}

export interface ICanvasText {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;

    defatultStyle: StyleType;
    wrapMode: WrapMode;
    wrapWidth: number;
    lineSpacing: number;
    maxLines: number;
    halign: HAlignMode,
    valign: VAlignMode,

    parser: BaseParser;
    penManager: PenManager;
    penPool: PenPoolType;
    imageManager: ImageManager;
    hitAreaManager: HitAreaManager;

    startYOffset: number
}