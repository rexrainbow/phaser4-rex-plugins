import { IBaseBoard } from '../IBaseBoard';
import { IChess, XYType } from '../../Types';
import { GetNeighborChessDirection } from './GetNeighborChessDirection'

export let AreNeighbors = function (
    board: IBaseBoard,
    chessA: IChess | XYType,
    chessB: IChess | XYType
): boolean {

    return (GetNeighborChessDirection(board, chessA, chessB) !== null);
}