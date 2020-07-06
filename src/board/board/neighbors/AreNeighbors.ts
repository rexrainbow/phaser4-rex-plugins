import {
    ILogicBoard,
    IChess, XYType
} from '../ILogicBoard';
import { GetNeighborChessDirection } from './GetNeighborChessDirection'

export let AreNeighbors = function (
    board: ILogicBoard,
    chessA: IChess | XYType,
    chessB: IChess | XYType
): boolean {

    return (GetNeighborChessDirection(board, chessA, chessB) !== null);
}