import {
    ILogicBoard,
    ZType, IChess
} from '../ILogicBoard';
import { WorldXYToTileXY } from './WorldXYToTileXY';
import { TileXYZToChess } from '../tileposition/TileXYZToChess';
import { TileXYToChessArray } from '../tileposition/TileXYToChessArray';

export let WorldXYToChess = function (
    board: ILogicBoard,
    worldX: number,
    worldY: number,
    tileZ?: ZType,
    out?: IChess[]
): IChess | IChess[] {

    let tileXY = WorldXYToTileXY(board, worldX, worldY, true);
    if (tileZ !== undefined) {
        return TileXYZToChess(board, tileXY.x, tileXY.y, tileZ)
    } else {
        return TileXYToChessArray(board, tileXY.x, tileXY.y, out);
    }
}