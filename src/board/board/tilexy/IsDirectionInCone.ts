import { IBaseBoard } from '../IBaseBoard';
import { IChess, XYType } from '../../Types';
import { ChessToTileXYZ } from './ChessToTileXYZ'

export function IsDirectionInCone(
    board: IBaseBoard,
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