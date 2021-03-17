import { LogicBoard } from './LogicBoard';
import { CreateTileTexture } from './texture'
import { Texture } from '@phaserjs/phaser/textures/Texture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';

export class Board extends LogicBoard {
    createTileTexture(
        key: string | Texture,
        fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
        strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
        lineWidth?: number,
        lineJoin: 'bevel' | 'round' | 'miter' = 'miter'
    ): this {

        CreateTileTexture(this, key, fillStyle, strokeStyle, lineWidth, lineJoin);
        return this;
    }
}