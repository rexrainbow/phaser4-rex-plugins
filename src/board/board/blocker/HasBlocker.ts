import {
    ILogicBoard,
    XType, YType, ZType
} from '../ILogicBoard'

export let HasBlocker = function (
    board: ILogicBoard,
    tileX: XType,
    tileY: YType,
    tileZ?: ZType
): boolean {

    if (tileZ === undefined) {
        // any chess at (tileX, tileY) has blocker
        let chessArray = board.tileXYToChessArray(tileX, tileY);
        for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
            let blocker = board.getChessData(chessArray[i]).blocker;
            if (blocker === true) {
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
        let blocker = board.getChessData(chess).blocker;
        return (blocker === true);

    }
}