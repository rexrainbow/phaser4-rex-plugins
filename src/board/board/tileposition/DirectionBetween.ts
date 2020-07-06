import { IBoardBase } from '../IBoardBase';
import { IChess, XYType } from '../../types';
import { ChessToTileXYZ } from './ChessToTileXYZ'

export let DirectionBetween = function (
    board: IBoardBase,
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