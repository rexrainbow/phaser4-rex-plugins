import {
    ILogicBoard,
    IChess, XYZType
} from '../ILogicBoard';

export let SwapChess = function (
    board: ILogicBoard,
    chessA: IChess,
    chessB: IChess,
    align: boolean = true
): void {

    let tileXYZA = board.chessToTileXYZ(chessA) as XYZType;
    let tileXYZB = board.chessToTileXYZ(chessB) as XYZType;
    if ((tileXYZA == null) || (tileXYZB == null)) {
        return;
    }
    board.removeChess(chessA);
    board.removeChess(chessB);
    board.addChess(chessA, tileXYZB.x, tileXYZB.y, tileXYZB.z, align);
    board.addChess(chessB, tileXYZA.x, tileXYZA.y, tileXYZA.z, align);
};