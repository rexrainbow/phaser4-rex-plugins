import { IBoardData } from '../IBoardData';
import { IChess } from '../../../Types';

export let HasChess = function (
    boardData: IBoardData,
    chess: IChess
): boolean {

    return boardData.chessToXYZ.has(chess);
}