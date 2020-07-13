import { IBoardData } from '../IBoardData';
import { IChess, XYZType } from '../../../Types';

export function GetXYZ(
    boardData: IBoardData,
    chess: IChess
): XYZType | null {

    return boardData.chessToXYZ.get(chess) || null;
}