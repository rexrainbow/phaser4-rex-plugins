import {
    ILogicBoard,
    IChess, XYType
} from '../ILogicBoard';
import { ChessToTileXYZ } from './ChessToTileXYZ'

export let DirectionBetween = function (
    board: ILogicBoard,
    chessA: IChess | XYType,
    chessB: IChess | XYType,
    round: boolean = true
): number | null {

    let tileA = ChessToTileXYZ(board, chessA);
    let tileB = ChessToTileXYZ(board, chessB);
    if ((tileA === null) || (tileB === null)) {
        return null;
    }

    return board.grid.directionBetween(tileA, tileB, round);
}