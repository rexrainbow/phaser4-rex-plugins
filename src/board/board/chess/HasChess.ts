import { IBoardBase } from '../IBoardBase';
import { IChess } from '../../types';

export let HasChess = function (
    board: IBoardBase,
    chess: IChess
): boolean {

    return board.boardData.chessToXYZ.has(chess);
}