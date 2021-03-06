import { IBaseBoard } from '../IBaseBoard';
import { XType, YType, ZType, IChess } from '../../Types';

export function TileXYZToChess(
    board: IBaseBoard,
    tileX: XType,
    tileY: YType,
    tileZ: ZType
): IChess | null {

    return board.boardData.getChess(tileX, tileY, tileZ) as IChess;
}