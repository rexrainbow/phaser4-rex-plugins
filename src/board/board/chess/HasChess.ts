import { IBaseBoard } from '../IBaseBoard';
import { IChess } from '../../types';

export let HasChess = function (
    board: IBaseBoard,
    chess: IChess
): boolean {

    return board.boardData.chessToXYZ.has(chess);
}