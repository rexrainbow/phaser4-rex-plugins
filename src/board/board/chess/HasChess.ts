import { IBaseBoard } from '../IBaseBoard';
import { IChess } from '../../Types';

export function HasChess(
    board: IBaseBoard,
    chess: IChess
): boolean {

    return board.boardData.chessToXYZ.has(chess);
}