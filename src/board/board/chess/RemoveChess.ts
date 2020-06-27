import {
    ILogicBoard,
    IChess, XType, YType, ZType, XYZType
} from '../ILogicBoard';
import { TileXYZToChess } from '../tileposition/TileXYZToChess';
import { GetChessData } from '../../chess/GetChessData';


export let RemoveChess = function (
    board: ILogicBoard,
    chess: IChess | null | undefined,
    tileX?: XType,
    tileY?: YType,
    tileZ?: ZType,
    destroy: boolean = false,
    fromBoardRemove: boolean = false
) {

    if (chess) {
        let tileXYZ = board.chessToTileXYZ(chess) as XYZType;
        if (tileXYZ) {
            tileX = tileXYZ.x;
            tileY = tileXYZ.y;
            tileZ = tileXYZ.z;
        } else {
            // chess is not in this board
            return;
        }
    } else {
        chess = TileXYZToChess(board, tileX, tileY, tileZ);
        if (!chess) {
            // chess is not in this board
            return;
        }
    }

    if (!fromBoardRemove) {
        board.boardData.removeChess(tileX, tileY, tileZ);
    }
    if (board.isBoard) {
        GetChessData(chess).setBoard(null);
    }

    if (destroy && chess.destroy) {
        chess.destroy();
    }
}