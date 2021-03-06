import { IBaseBoard } from '../IBaseBoard';
import { ZType, IChess } from '../../Types';
import { WorldXYToTileXY } from './WorldXYToTileXY';
import { TileXYZToChess } from '../tilexy/TileXYZToChess';
import { TileXYToChessArray } from '../tilexy/TileXYToChessArray';

export function WorldXYToChess(
    board: IBaseBoard,
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