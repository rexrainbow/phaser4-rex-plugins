import { IBaseBoard } from '../IBaseBoard';
import { ZType, IChess } from '../../Types';

export function TileZToChessArray(
    board: IBaseBoard,
    tileZ: ZType,
    out: IChess[] = []
): IChess[] {

    let chessSet = board.boardData.ZToChessSet.get(tileZ);
    if (chessSet) {
        for (const chess of chessSet) {
            out.push(chess);
        }
    }
    return out;
}