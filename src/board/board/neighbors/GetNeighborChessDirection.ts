import {
    ILogicBoard,
    IChess, XYType,
} from '../ILogicBoard';
import { ChessToTileXYZ } from '../tileposition/ChessToTileXYZ';
import { GetNeighborTileDirection } from './GetNeighborTileDirection'

export let GetNeighborChessDirection = function (
    board: ILogicBoard,
    chess: IChess | XYType,
    neighborChess: IChess | XYType
): number {

    let srcTileXYZ = ChessToTileXYZ(board, chess);
    let neighborTileXYZ = ChessToTileXYZ(board, neighborChess);
    return GetNeighborTileDirection(board, srcTileXYZ, neighborTileXYZ);
}