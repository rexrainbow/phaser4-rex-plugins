import {
    ILogicBoard,
    XType, YType
} from '../ILogicBoard';

export let GetOppositeDirection = function (
    baord: ILogicBoard,
    tileX: XType,
    tileY: YType,
    direction: number
): number {

    return baord.grid.getOppositeDirection(tileX, tileY, direction);
}