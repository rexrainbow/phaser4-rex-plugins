import {
    ILogicBoard,
    IChess
} from '../ILogicBoard';

export let HasChess = function (
    board: ILogicBoard,
    chess: IChess
): boolean {

    return board.boardData.chessToXYZ.has(chess);
}