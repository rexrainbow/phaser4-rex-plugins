import { IBaseBoard } from '../IBaseBoard';
import { XType, YType, IChess, ZMapType } from '../../Types';

export function TileXYToChessArray(
    board: IBaseBoard,
    tileX: XType,
    tileY: YType,
    out: IChess[] = []
): IChess[] {

    let zMap = board.boardData.getChess(tileX, tileY) as ZMapType;
    for (const [tileZ, chess] of zMap) {
        out.push(chess);
    }
    return out;
}