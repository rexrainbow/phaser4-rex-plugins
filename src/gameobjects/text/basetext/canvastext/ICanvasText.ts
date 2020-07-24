import { StyleType } from '../Types';
import { BaseParser } from '../parser/BaseParser';
import { PenManager, PenPoolType } from '../penmanger/PenManager';
import { ImageManager } from '../imagemanager/ImageManager';
import { HitAreaManager } from '../hitareamanager/HitAreaManager'

export interface IConfig {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    defatultStyle?: StyleType;
    parser?: BaseParser;
    penPool?: PenPoolType;
}

export interface ICanvasText {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;


    defatultStyle: StyleType;

    parser: BaseParser;
    penManager: PenManager;
    penPool: PenPoolType;
    imageManager: ImageManager;
    hitAreaManager: HitAreaManager;

    textWidth: number;
    textHeight: number;
    startXOffset: number;
    startYOffset: number;
}