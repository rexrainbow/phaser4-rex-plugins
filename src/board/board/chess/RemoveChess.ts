import { IBoardBase } from '../IBoardBase';
import { IChess, XType, YType, ZType, XYZType } from '../../types';
import { TileXYZToChess } from '../tileposition/TileXYZToChess';
import { ChessToTileXYZ } from '../tileposition/ChessToTileXYZ';
import { GetChessData } from '../chessdata/GetChessData';


export let RemoveChess = function (
    board: IBoardBase,
    chess: IChess | null | undefined,
    tileX?: XType,
    tileY?: YType,
    tileZ?: ZType,
    destroy: boolean = false,
    fromBoardRemove: boolean = false
) {

    if (chess) {
        let tileXYZ = ChessToTileXYZ(board, chess) as XYZType;
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
    if (board._isBoard) {
        GetChessData(chess).setBoard(null);
    }

    if (destroy && chess.destroy) {
        chess.destroy();
    }
}