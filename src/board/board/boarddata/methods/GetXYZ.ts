import { IBoardData } from '../IBoardData';
import { IChess, XYZType } from '../../../types';

export let GetXYZ = function (
    boardData: IBoardData,
    chess: IChess
): XYZType | null {

    return boardData.chessToXYZ.get(chess) || null;
}