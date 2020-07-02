import {
    ILogicBoard,
    IChess, XType, YType, ZType, XYZType
} from '../ILogicBoard';
import { TileXYZToChess } from '../tileposition/TileXYZToChess';
import { GetChessData } from '../../chess/GetChessData';
import { GridAlign } from '../worldposition/GridAlign';

export let AddChess = function (
    board: ILogicBoard,
    chess: IChess,
    tileX: XType,
    tileY: YType,
    tileZ?: ZType,
    align: boolean = true
) {

    if (!board.contains(tileX, tileY)) {
        return;
    }

    let curTileXYZ = board.chessToTileXYZ(chess) as XYZType;
    if (tileZ === undefined) {
        if (curTileXYZ) {
            tileZ = curTileXYZ.z;
        } else {
            tileZ = 0;
        }
    }

    if (curTileXYZ &&
        (curTileXYZ.x === tileX) && (curTileXYZ.y === tileY) && (curTileXYZ.z === tileZ)) {
        // Move to current position
        return;
    }

    let occupiedChess = TileXYZToChess(board, tileX, tileY, tileZ);
    if (occupiedChess) {
        // board.emit('kickout', occupiedChess, chess, curTileXYZ);
        board.removeChess(null, tileX, tileY, tileZ); // Clear up (tileX, tileY, tileZ)
    }

    board.boardData.addChess(chess, tileX, tileY, tileZ);

    if (board.isBoard) {
        GetChessData(chess).setBoard(board);
    }

    if (align) {
        GridAlign(board, chess, tileX, tileY);
    }
};