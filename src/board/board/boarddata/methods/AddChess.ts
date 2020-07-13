import { IBoardData } from '../IBoardData';
import { XType, YType, ZType, IChess } from '../../../Types';
import { AddChessToZMap } from './ZMap';
import { AddChessToSet } from './ChessSet';

export let AddChess = function (
    boardData: IBoardData,
    chess: IChess,
    x: XType,
    y: YType,
    z: ZType
): void {

    let prevXYZ = boardData.chessToXYZ.get(chess);
    let prevX = (prevXYZ) ? prevXYZ.x : undefined;
    let prevY = (prevXYZ) ? prevXYZ.y : undefined;
    let prevZ = (prevXYZ) ? prevXYZ.y : undefined;

    if (prevXYZ) {
        prevXYZ.x = x;
        prevXYZ.y = y;
        prevXYZ.z = z;
    } else {
        boardData.chessToXYZ.set(chess, { x: x, y: y, z: z });
    }
    AddChessToZMap(chess, boardData.XYToZMap, prevX, prevY, prevZ, x, y, z);
    AddChessToSet(chess, boardData.XToChessSet, prevX, x);
    AddChessToSet(chess, boardData.YToChessSet, prevY, y);
    AddChessToSet(chess, boardData.ZToChessSet, prevZ, z);
}