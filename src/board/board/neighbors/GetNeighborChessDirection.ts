import { IBaseBoard } from '../IBaseBoard';
import { IChess, XYType } from '../../Types';
import { ChessToTileXYZ } from '../tilexy/ChessToTileXYZ';
import { GetNeighborTileDirection } from './GetNeighborTileDirection'

export function GetNeighborChessDirection(
    board: IBaseBoard,
    chess: IChess | XYType,
    neighborChess: IChess | XYType
): number {

    let srcTileXYZ = ChessToTileXYZ(board, chess);
    let neighborTileXYZ = ChessToTileXYZ(board, neighborChess);
    return GetNeighborTileDirection(board, srcTileXYZ, neighborTileXYZ);
}