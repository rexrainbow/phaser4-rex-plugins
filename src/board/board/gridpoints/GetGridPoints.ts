import {
    ILogicBoard,
    Vec2Type
} from '../ILogicBoard';

export let GetGridPoints = function (
    board: ILogicBoard,
    tileX?: number | Vec2Type,
    tileY?: number,
    out?: Vec2Type[] | true
): Vec2Type[] {

    return board.grid.getGridPoints(tileX, tileY, out);
}