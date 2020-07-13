import { IBaseBoard } from '../IBaseBoard';
import { IChess, XYType } from '../../Types';
import { ChessToTileXYZ } from './ChessToTileXYZ'

export function DirectionBetween(
    board: IBaseBoard,
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