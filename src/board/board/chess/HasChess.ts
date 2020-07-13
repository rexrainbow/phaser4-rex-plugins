import { IBaseBoard } from '../IBaseBoard';
import { IChess } from '../../Types';

export let HasChess = function (
    board: IBaseBoard,
    chess: IChess
): boolean {

    return board.boardData.chessToXYZ.has(chess);
}