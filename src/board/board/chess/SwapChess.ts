import { IBaseBoard } from '../IBaseBoard';
import { IChess, XYZType } from '../../Types';
import { ChessToTileXYZ } from '../tilexy/ChessToTileXYZ';
import { RemoveChess } from './RemoveChess';
import { AddChess } from './AddChess';


export let SwapChess = function (
    board: IBaseBoard,
    chessA: IChess,
    chessB: IChess,
    align: boolean = true
): void {

    let tileXYZA = ChessToTileXYZ(board, chessA) as XYZType;
    let tileXYZB = ChessToTileXYZ(board, chessB) as XYZType;
    if ((tileXYZA == null) || (tileXYZB == null)) {
        return;
    }
    RemoveChess(board, chessA);
    RemoveChess(board, chessB);
    AddChess(board, chessA, tileXYZB.x, tileXYZB.y, tileXYZB.z, align);
    AddChess(board, chessB, tileXYZA.x, tileXYZA.y, tileXYZA.z, align);
};