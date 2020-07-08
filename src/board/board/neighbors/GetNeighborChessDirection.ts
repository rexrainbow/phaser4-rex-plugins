import { IBaseBoard } from '../IBaseBoard';
import { IChess, XYType } from '../../types';
import { ChessToTileXYZ } from '../tilexy/ChessToTileXYZ';
import { GetNeighborTileDirection } from './GetNeighborTileDirection'

export let GetNeighborChessDirection = function (
    board: IBaseBoard,
    chess: IChess | XYType,
    neighborChess: IChess | XYType
): number {

    let srcTileXYZ = ChessToTileXYZ(board, chess);
    let neighborTileXYZ = ChessToTileXYZ(board, neighborChess);
    return GetNeighborTileDirection(board, srcTileXYZ, neighborTileXYZ);
}