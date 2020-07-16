import { StyleType } from '../Types';
import { BaseParser } from '../parser/BaseParser';
import { HitAreaManager } from '../hitareamanager/HitAreaManager'

export interface ICanvasText {

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    resolution: number;

    defatultStyle: StyleType;
    parser: BaseParser;
    hitAreaManager: HitAreaManager;

    startYOffset: number
}