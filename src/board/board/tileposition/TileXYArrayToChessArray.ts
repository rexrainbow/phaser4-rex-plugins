import {
    ILogicBoard,
    ZType, XYType, IChess
} from '../ILogicBoard';
import { TileXYZToChess } from './TileXYZToChess';
import { TileXYToChessArray } from './TileXYToChessArray';


export let TileXYArrayToChessArray = function (
    board: ILogicBoard,
    tileXYArray: XYType[],
    tileZ?: ZType,
    out: IChess[] = []
): IChess[] {

    let tileZMode = (tileZ != null);
    let tileXY: XYType,
        chess: IChess;
    for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        if (tileZMode) {
            chess = TileXYZToChess(board, tileXY.x, tileXY.y, tileZ as ZType);
            if (chess !== null) {
                out.push(chess);
            }
        } else {
            TileXYToChessArray(board, tileXY.x, tileXY.y, out);
        }
    }
    return out;
}