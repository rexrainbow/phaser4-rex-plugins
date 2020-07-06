import { IBoardBase } from '../IBoardBase';
import { IChess, XYType } from '../../types';
import { ChessToTileXYZ } from '../tileposition/ChessToTileXYZ';
import { GetNeighborTileDirection } from './GetNeighborTileDirection'

export let GetNeighborChessDirection = function (
    board: IBoardBase,
    chess: IChess | XYType,
    neighborChess: IChess | XYType
): number {

    let srcTileXYZ = ChessToTileXYZ(board, chess);
    let neighborTileXYZ = ChessToTileXYZ(board, neighborChess);
    return GetNeighborTileDirection(board, srcTileXYZ, neighborTileXYZ);
}