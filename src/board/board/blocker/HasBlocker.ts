import {
    ILogicBoard,
    XType, YType, ZType
} from '../ILogicBoard';
import { TileXYToChessArray } from '../tileposition/TileXYToChessArray';
import { TileXYZToChess } from '../tileposition/TileXYZToChess';
import { GetChessData } from '../chessdata/GetChessData';

export let HasBlocker = function (
    board: ILogicBoard,
    tileX: XType,
    tileY: YType,
    tileZ?: ZType
): boolean {

    if (tileZ === undefined) {
        // any chess at (tileX, tileY) has blocker
        let chessArray = TileXYToChessArray(board, tileX, tileY);
        for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
            let blocker = GetChessData(chessArray[i]).blocker;
            if (blocker === true) {
                return true;
            }
        }
        return false;

    } else {
        // chess at (tileX, tileY, tileZ) has blocker
        let chess = TileXYZToChess(board, tileX, tileY, tileZ);
        if (chess === null) {
            return false;
        }
        let blocker = GetChessData(chess).blocker;
        return (blocker === true);

    }
}