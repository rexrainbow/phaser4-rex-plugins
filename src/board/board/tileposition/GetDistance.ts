import {
    ILogicBoard,
    XYType
} from '../ILogicBoard';

export let GetDistance = function (
    board: ILogicBoard,
    tileA: XYType,
    tileB: XYType,
    roughMode?: boolean
): number {

    return board.grid.getDistance(tileA, tileB, roughMode);
}