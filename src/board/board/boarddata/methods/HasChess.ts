import { IBoardData, ChessType } from '../IBoardData';

export let HasChess = function (
    boardData: IBoardData,
    chess: ChessType
): boolean {

    return boardData.chessToXYZ.has(chess);
}