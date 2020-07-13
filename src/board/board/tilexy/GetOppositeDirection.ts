import { IBaseBoard } from '../IBaseBoard';
import { XType, YType } from '../../Types';

export function GetOppositeDirection(
    baord: IBaseBoard,
    tileX: XType,
    tileY: YType,
    direction: number
): number {

    return baord.grid.getOppositeDirection(tileX, tileY, direction);
}