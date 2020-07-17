import { StyleType } from '../Types';
import { BaseParser } from '../parser/BaseParser';
import { PenManager } from '../penmanger/PenManager';
import { ImageManager } from '../imagemanager/ImageManager';
import { HitAreaManager } from '../hitareamanager/HitAreaManager'

export interface ICanvasText {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;

    defatultStyle: StyleType;
    parser: BaseParser;
    penManager: PenManager;
    imageManager: ImageManager;
    hitAreaManager: HitAreaManager;

    startYOffset: number
}