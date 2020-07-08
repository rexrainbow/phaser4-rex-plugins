import { IBaseBoard } from '../IBaseBoard';
import { XType, YType } from '../../types';

export let GetOppositeDirection = function (
    baord: IBaseBoard,
    tileX: XType,
    tileY: YType,
    direction: number
): number {

    return baord.grid.getOppositeDirection(tileX, tileY, direction);
}