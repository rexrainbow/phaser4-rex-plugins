import { IBoardBase } from '../IBoardBase';
import { IChess, XType, YType, XYZType } from '../../types';
import { GetAllChess } from '../chess/GetAllChess';
import { ChessToTileXYZ } from '../tileposition/ChessToTileXYZ';
import { TileXYToWorldXY } from './TileXYToWorldXY';

export let GridAlign = function (
    board: IBoardBase,
    chess?: IChess,
    tileX?: XType,
    tileY?: YType
): void {

    if (chess === undefined) {
        let chessArray = GetAllChess(board);
        for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
            let chess = chessArray[i];
            let tileXYZ = ChessToTileXYZ(board, chess) as XYZType;

            TileXYToWorldXY(board, tileXYZ.x, tileXYZ.y, chess);
        }
    } else {
        if (tileX === undefined) {
            let tileXYZ = ChessToTileXYZ(board, chess) as XYZType;
            tileX = tileXYZ.x;
            tileY = tileXYZ.y;
        }

        TileXYToWorldXY(board, tileX, tileY, chess);
    }
};