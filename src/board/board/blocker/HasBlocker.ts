import { IBaseBoard } from '../IBaseBoard';
import { XType, YType, ZType } from '../../Types';
import { TileXYToChessArray } from '../tilexy/TileXYToChessArray';
import { TileXYZToChess } from '../tilexy/TileXYZToChess';
import { GetChessData } from '../chessdata/GetChessData';

export let HasBlocker = function (
    board: IBaseBoard,
    tileX: XType,
    tileY: YType,
    tileZ?: ZType
): boolean {

    if (tileZ === undefined) {
        // Any chess at (tileX, tileY) has blocker
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