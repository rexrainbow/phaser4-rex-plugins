import {
    ILogicBoard,
    IChess, XYType
} from '../ILogicBoard';

export let DirectionBetween = function (
    board: ILogicBoard,
    chessA: IChess | XYType,
    chessB: IChess | XYType,
    round: boolean = true
): number | null {

    let tileA = board.chessToTileXYZ(chessA);
    let tileB = board.chessToTileXYZ(chessB);
    if ((tileA === null) || (tileB === null)) {
        return null;
    }

    return board.grid.directionBetween(tileA, tileB, round);
}