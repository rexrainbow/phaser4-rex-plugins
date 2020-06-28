import {
    ILogicBoard,
    XType, YType, ZType,
    EdgeBlockerType
} from '../ILogicBoard'

export let HasEdgeBlocker = function (
    board: ILogicBoard,
    tileX: XType,
    tileY: YType,
    tileZ: ZType | undefined,
    direction: number
): boolean {

    if (tileZ === undefined) {
        // any chess at (tileX, tileY) has blocker
        let chessArray = board.tileXYToChessArray(tileX, tileY);
        for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
            if (IsEdgeBlocker(board.getChessData(chessArray[i]).blocker, direction)) {
                return true;
            }
        }
        return false;

    } else {
        // chess at (tileX, tileY, tileZ) has blocker
        let chess = board.tileXYZToChess(tileX, tileY, tileZ);
        if (chess === null) {
            return false;
        }
        return IsEdgeBlocker(board.getChessData(chess).blocker, direction);
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