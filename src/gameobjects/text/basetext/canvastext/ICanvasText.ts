import { IBaseText } from '../IBaseText';
import { BaseParser } from '../parser/BaseParser';
import { PenManager, PenPoolType } from '../penmanger/PenManager';
import { ImageManager } from '../imagemanager/ImageManager';
import { HitAreaManager } from '../hitareamanager/HitAreaManager'

export interface IConfig {
    canvas?: HTMLCanvasElement;
    context?: CanvasRenderingContext2D;
    parent?: IBaseText;
    parser?: BaseParser;
    penPool?: PenPoolType;
}

export interface ICanvasText {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;


    parent: IBaseText;

    parser: BaseParser;
    penManager: PenManager;
    penPool: PenPoolType;
    imageManager: ImageManager;
    hitAreaManager: HitAreaManager;

    textWidth: number;
    textHeight: number;
    textOffsetX: number;
    textOffsetY: number;
}