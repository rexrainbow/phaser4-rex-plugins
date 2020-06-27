import { IChessData } from './IChessData';
import { ChessData } from './ChessData';

export let GetChessData = function (gameObject: { rexChess?: IChessData }): IChessData {
    if (!gameObject.hasOwnProperty('rexChess')) {
        gameObject.rexChess = new ChessData(gameObject);
    }
    return gameObject.rexChess;
}