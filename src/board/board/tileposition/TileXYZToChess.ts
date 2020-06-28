import {
    ILogicBoard,
    XType, YType, ZType,
    IChess
} from '../ILogicBoard';

export let TileXYZToChess = function (
    board: ILogicBoard,
    tileX: XType,
    tileY: YType,
    tileZ: ZType
): IChess | null {

    return board.boardData.getChess(tileX, tileY, tileZ) as IChess;
}