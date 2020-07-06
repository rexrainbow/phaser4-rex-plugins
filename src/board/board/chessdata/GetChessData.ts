import { IChessData } from './IChessData';
import { ChessData } from './ChessData';
import { IChess } from '../../types';

export let GetChessData = function (
    chess: IChess
): IChessData {

    if (!chess.hasOwnProperty('rexChess')) {
        chess.rexChess = new ChessData(chess);
    }
    return chess.rexChess;
}