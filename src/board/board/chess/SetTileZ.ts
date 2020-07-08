import { IBaseBoard } from '../IBaseBoard';
import { IChess, ZType, XType, YType } from '../../types';
import { ChessToTileXYZ } from '../tilexy/ChessToTileXYZ';
import { AddChess } from './AddChess';

export let SetTileZ = function (
    board: IBaseBoard,
    chess: IChess,
    tileZ: ZType
): void {

    let srcTileXYZ = ChessToTileXYZ(board, chess);
    if (srcTileXYZ === null) {
        return;
    }

    AddChess(board, chess, srcTileXYZ.x, srcTileXYZ.y, tileZ);
}