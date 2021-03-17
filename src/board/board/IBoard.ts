import { ILogicBoard } from './ILogicBoard';
import { Texture } from '@phaserjs/phaser/textures/Texture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';

export interface IBoard extends ILogicBoard {

    createTileTexture(
        key: string | Texture,
        fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
        strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
        lineWidth?: number,
        lineJoin?: 'bevel' | 'round' | 'miter'
    ): this;
}