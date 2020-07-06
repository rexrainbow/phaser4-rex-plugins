import {
    ILogicBoard,
    IChess, XType, YType, ZType, XYZType
} from '../ILogicBoard';
import { TileXYZToChess } from '../tileposition/TileXYZToChess';
import { ChessToTileXYZ } from '../tileposition/ChessToTileXYZ';
import { Contains } from '../tileposition/Contains';
import { GetChessData } from '../chessdata/GetChessData';
import { GridAlign } from '../worldposition/GridAlign';
import { RemoveChess } from './RemoveChess'

export let AddChess = function (
    board: ILogicBoard,
    chess: IChess,
    tileX: XType,
    tileY: YType,
    tileZ?: ZType,
    align: boolean = true
) {

    if (!Contains(board, tileX, tileY)) {
        return;
    }

    let curTileXYZ = ChessToTileXYZ(board, chess) as XYZType;
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
        RemoveChess(board, null, tileX, tileY, tileZ); // Clear up (tileX, tileY, tileZ)
    }

    board.boardData.addChess(chess, tileX, tileY, tileZ);

    if (board._isBoard) {
        GetChessData(chess).setBoard(board);
    }

    if (align) {
        GridAlign(board, chess, tileX, tileY);
    }
};