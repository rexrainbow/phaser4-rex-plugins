import {
    ILogicBoard,
    PositionType
} from '../ILogicBoard';

export let GetGridPoints = function (
    board: ILogicBoard,
    tileX?: number | PositionType,
    tileY?: number,
    out?: PositionType[] | true
): PositionType[] {

    return board.grid.getGridPoints(tileX, tileY, out);
}