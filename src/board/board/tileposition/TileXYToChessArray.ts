import {
    ILogicBoard,
    XType, YType,
    IChess
} from '../ILogicBoard';
import { ZMapType } from '../boarddata/IBoardData';

export let TileXYToChessArray = function (
    board: ILogicBoard,
    tileX: XType,
    tileY: YType,
    out: IChess[] = []
): IChess[] {

    let zMap = board.boardData.getChess(tileX, tileY) as ZMapType;
    for (const [tileZ, chess] of zMap) {
        out.push(chess);
    }
    return out;
}