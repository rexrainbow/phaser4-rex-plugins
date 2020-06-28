import {
    ILogicBoard,
    IChess, XYType
} from '../ILogicBoard';

export let AreNeighbors = function (
    board: ILogicBoard,
    chessA: IChess | XYType,
    chessB: IChess | XYType
): boolean {

    return (board.getNeighborChessDirection(chessA, chessB) !== null);
}