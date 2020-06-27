import {
    IBoardData,
    IChess, XYZType
} from '../IBoardData';

export let GetXYZ = function (
    boardData: IBoardData,
    chess: IChess
): XYZType | undefined {

    return boardData.chessToXYZ.get(chess);
}