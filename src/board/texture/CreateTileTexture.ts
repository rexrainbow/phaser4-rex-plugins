import { GetGridPoints } from '../board/worldxy/GetGridPoints';
import { IBaseBoard } from '../board/IBaseBoard';
import { Texture } from '@phaserjs/phaser/textures/Texture';
import { CreatePolygonTexture } from '../../texture/canvastexture';
import { GetCanvasGradientCallbackType } from '../../utils/types/GetCanvasGradientCallbackType';

export function CreateTileTexture(
    board: IBaseBoard,
    key: string | Texture,
    fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType,
    lineWidth?: number,
    lineJoin: 'bevel' | 'round' | 'miter' = 'miter'
) {
    CreatePolygonTexture(
        key,
        {
            points: GetGridPoints(board, 0, 0, true),
            fillStyle: fillStyle,
            strokeStyle: strokeStyle,
            lineWidth: lineWidth,
            lineJoin: lineJoin
        }
    );
}