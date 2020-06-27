import {
    ILogicBoard,
    ZType, XYType, IChess
} from '../ILogicBoard';
import { TileXYZToChess } from './TileXYZToChess';
import { TileXYToChessArray } from './TileXYToChessArray';


export let TileXYArrayToChessArray = function (
    board: ILogicBoard,
    tileXYArray: XYType[],
    tileZ?: ZType | IChess[],
    out?: IChess[]
): IChess[] {

    if (Array.isArray(tileZ)) {
        out = tileZ;
        tileZ = undefined;
    }
    if (out === undefined) {
        out = [];
    }
    let tileZMode = (tileZ != undefined);
    let tileXY: XYType;
    for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        if (tileZMode) {
            out.push(TileXYZToChess(board, tileXY.x, tileXY.y, tileZ as ZType));
        } else {
            TileXYToChessArray(board, tileXY.x, tileXY.y, out);
        }
    }
    return out;
}