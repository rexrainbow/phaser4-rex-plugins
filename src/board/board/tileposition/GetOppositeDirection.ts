import { IBoardBase } from '../IBoardBase';
import { XType, YType } from '../../types';

export let GetOppositeDirection = function (
    baord: IBoardBase,
    tileX: XType,
    tileY: YType,
    direction: number
): number {

    return baord.grid.getOppositeDirection(tileX, tileY, direction);
}