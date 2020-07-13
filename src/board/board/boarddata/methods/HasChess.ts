import { IBoardData } from '../IBoardData';
import { IChess } from '../../../Types';

export function HasChess(
    boardData: IBoardData,
    chess: IChess
): boolean {

    return boardData.chessToXYZ.has(chess);
}