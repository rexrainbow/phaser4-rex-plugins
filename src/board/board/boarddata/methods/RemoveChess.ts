import {
    IBoardData,
    XType, YType, ZType,
    ZMapType
} from '../IBoardData';
import { GetChess } from './GetChess';
import { RemoveChessFromZMap } from './ZMap';
import { RemoveChessFromSet } from './ChessSet';

export let RemoveChess = function (
    boardData: IBoardData,
    x: XType,
    y: YType,
    z?: ZType
): void {

    if (z !== undefined) {
        let chess = GetChess(boardData, x, y, z);
        if (chess === undefined) {
            return;
        }

        boardData.chessToXYZ.delete(chess);
        RemoveChessFromZMap(boardData.XYToZMap, x, y, z);
        RemoveChessFromSet(boardData.XToChessSet, x, chess);
        RemoveChessFromSet(boardData.YToChessSet, y, chess);
        RemoveChessFromSet(boardData.ZToChessSet, z, chess);

    } else {

        let zMap = GetChess(boardData, x, y) as ZMapType;
        if (zMap) {
            for (const [z, chess] of zMap) {
                boardData.chessToXYZ.delete(chess);
                // RemoveChessFromZMap(boardData.XYToZMap, x, y, z);
                RemoveChessFromSet(boardData.XToChessSet, x, chess);
                RemoveChessFromSet(boardData.YToChessSet, y, chess);
                RemoveChessFromSet(boardData.ZToChessSet, z, chess);

            }

            RemoveChessFromZMap(boardData.XYToZMap, x, y);

        }
    }
}