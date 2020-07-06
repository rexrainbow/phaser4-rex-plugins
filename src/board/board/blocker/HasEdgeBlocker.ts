import {
    ILogicBoard,
    XType, YType, ZType,
    EdgeBlockerType
} from '../ILogicBoard';
import { TileXYToChessArray } from '../tileposition/TileXYToChessArray';
import { TileXYZToChess } from '../tileposition/TileXYZToChess';
import { GetChessData } from '../chessdata/GetChessData';

export let HasEdgeBlocker = function (
    board: ILogicBoard,
    tileX: XType,
    tileY: YType,
    tileZ: ZType | undefined,
    direction: number
): boolean {

    if (tileZ === undefined) {
        // any chess at (tileX, tileY) has blocker
        let chessArray = TileXYToChessArray(board, tileX, tileY);
        for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
            if (IsEdgeBlocker(GetChessData(chessArray[i]).blocker, direction)) {
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
        return IsEdgeBlocker(GetChessData(chess).blocker, direction);
    }
}

let IsEdgeBlocker = function (
    blocker: EdgeBlockerType | boolean,
    direction: number
): boolean {

    if ((blocker === false) || (blocker === true)) {
        return blocker;
    } else {
        return (blocker[direction] === true);
    }
}