import { IBoardBase } from '../IBoardBase';
import { IChess, XYType, XYZType, ZType } from '../../types';
import { ChessToTileXYZ } from '../tileposition/ChessToTileXYZ';
import { TileXYArrayToChessArray } from '../tileposition/TileXYArrayToChessArray';
import { TileXYToChessArray } from '../tileposition/TileXYToChessArray';
import { TileXYZToChess } from '../tileposition/TileXYZToChess';
import { GetNeighborTileXY } from './GetNeighborTileXY';

export let GetNeighborChess = function (
    board: IBoardBase,
    chess: IChess | XYType,
    directions: number | number[] | string | null,
    neighborTileZ?: ZType | null,
    out?: IChess[]
): IChess | IChess[] | null {

    let tileXYZ = ChessToTileXYZ(board, chess);
    if (tileXYZ === null) { // chess is not on board
        return null;
    }

    if (neighborTileZ == null) {
        neighborTileZ = (tileXYZ.hasOwnProperty('z')) ? (tileXYZ as XYZType).z : null;
    }

    let neighborTileXY = GetNeighborTileXY(board, tileXYZ, directions, true);
    if (neighborTileXY === null) {
        return null;
    } else if (Array.isArray(neighborTileXY)) { // NeighborTileXY array -> chess array
        if (out === undefined) {
            out = [];
        }
        return TileXYArrayToChessArray(board, neighborTileXY, neighborTileZ, out);
    } else { // Single neighborTileXY -> single chess if tileZ, chess array if no tileZ
        if (neighborTileZ == null) {
            if (out === undefined) {
                out = [];
            }
            return TileXYToChessArray(board, neighborTileXY.x, neighborTileXY.y, out);
        } else {
            return TileXYZToChess(board, neighborTileXY.x, neighborTileXY.y, neighborTileZ);
        }
    }
}