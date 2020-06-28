import {
    ILogicBoard,
    IChess, XYType,
} from '../ILogicBoard';

export let GetNeighborChessDirection = function (
    board: ILogicBoard,
    chess: IChess | XYType,
    neighborChess: IChess | XYType
): number {

    let srcTileXYZ = board.chessToTileXYZ(chess);
    let neighborTileXYZ = board.chessToTileXYZ(neighborChess);
    return board.getNeighborTileDirection(srcTileXYZ, neighborTileXYZ);
}