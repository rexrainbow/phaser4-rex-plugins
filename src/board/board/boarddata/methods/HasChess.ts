import { IBoardData, IChess } from '../IBoardData';

export let HasChess = function (
    boardData: IBoardData,
    chess: IChess
): boolean {

    return boardData.chessToXYZ.has(chess);
}