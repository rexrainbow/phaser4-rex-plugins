import {
    ILogicBoard,
    ZType, IChess
} from '../ILogicBoard';

export let WorldXYToChess = function (
    board: ILogicBoard,
    worldX: number,
    worldY: number,
    tileZ?: ZType,
    out?: IChess[]
): IChess | IChess[] {

    let tileXY = board.worldXYToTileXY(worldX, worldY, true);
    if (tileZ !== undefined) {
        return board.tileXYZToChess(tileXY.x, tileXY.y, tileZ)
    } else {
        return board.tileXYToChessArray(tileXY.x, tileXY.y, out);
    }
}