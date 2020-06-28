import {
    ILogicBoard,
    IChess, XYType
} from '../ILogicBoard';

export let IsDirectionInCone = function (
    board: ILogicBoard,
    chessA: IChess | XYType,
    chessB: IChess | XYType,
    face: number,
    cone: number
): boolean {

    let tileXYA = board.chessToTileXYZ(chessA);
    let tileXYB = board.chessToTileXYZ(chessB);

    let savedDirections = board.grid.directions; // Save directions
    board.grid.directions = board.grid.sides;
    let direction = board.grid.directionBetween(tileXYA, tileXYB, false);
    board.grid.directions = savedDirections; // Restore directions

    let deltaDirection = Math.abs(direction - face);
    deltaDirection = Math.min(deltaDirection, board.grid.directions - deltaDirection);
    return (deltaDirection <= (cone / 2));
}