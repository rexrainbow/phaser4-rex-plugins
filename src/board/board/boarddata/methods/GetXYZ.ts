import {
    IBoardData,
    ChessType, LogicPosType
} from '../IBoardData';

export let GetXYZ = function (
    boardData: IBoardData,
    chess: ChessType
): LogicPosType | undefined {

    return boardData.chessToXYZ.get(chess);
}