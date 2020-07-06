import { IBoardBase } from '../IBoardBase';
import { IChess, XYType } from '../../types';
import { GetNeighborChessDirection } from './GetNeighborChessDirection'

export let AreNeighbors = function (
    board: IBoardBase,
    chessA: IChess | XYType,
    chessB: IChess | XYType
): boolean {

    return (GetNeighborChessDirection(board, chessA, chessB) !== null);
}