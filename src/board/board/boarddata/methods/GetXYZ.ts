import {
    IBoardData,
    IChess, XYZType
} from '../IBoardData';

export let GetXYZ = function (
    boardData: IBoardData,
    chess: IChess
): XYZType | null {
    
    return boardData.chessToXYZ.get(chess) || null;
}