import { IBoardBase } from '../IBoardBase';
import { IChess, XYType } from '../../types';
import { ChessToTileXYZ } from './ChessToTileXYZ'

export let IsDirectionInCone = function (
    board: IBoardBase,
    chessA: IChess | XYType,
    chessB: IChess | XYType,
    face: number,
    cone: number
): boolean {

    let tileXYA = ChessToTileXYZ(board, chessA);
    let tileXYB = ChessToTileXYZ(board, chessB);

    let savedDirections = board.grid.directions; // Save directions
    board.grid.directions = board.grid.sides;
    let direction = board.grid.directionBetween(tileXYA, tileXYB, false);
    board.grid.directions = savedDirections; // Restore directions

    let deltaDirection = Math.abs(direction - face);
    deltaDirection = Math.min(deltaDirection, board.grid.directions - deltaDirection);
    return (deltaDirection <= (cone / 2));
}