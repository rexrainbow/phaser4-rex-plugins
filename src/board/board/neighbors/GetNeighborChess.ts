import {
    ILogicBoard,
    IChess, XYType, XYZType, ZType
} from '../ILogicBoard';

export let GetNeighborChess = function (
    board: ILogicBoard,
    chess: IChess | XYType,
    directions: number | number[] | string | null,
    neighborTileZ?: ZType | null,
    out?: IChess[]
): IChess | IChess[] | null {

    let tileXYZ = board.chessToTileXYZ(chess);
    if (tileXYZ === null) { // chess is not on board
        return null;
    }

    if (neighborTileZ == null) {
        neighborTileZ = (tileXYZ.hasOwnProperty('z')) ? (tileXYZ as XYZType).z : null;
    }

    let neighborTileXY = board.getNeighborTileXY(tileXYZ, directions, true);
    if (neighborTileXY === null) {
        return null;
    } else if (Array.isArray(neighborTileXY)) { // NeighborTileXY array -> chess array
        if (out === undefined) {
            out = [];
        }
        return board.tileXYArrayToChessArray(neighborTileXY, neighborTileZ, out);
    } else { // Single neighborTileXY -> single chess if tileZ, chess array if no tileZ
        if (neighborTileZ == null) {
            if (out === undefined) {
                out = [];
            }
            return board.tileXYToChessArray(neighborTileXY.x, neighborTileXY.y, out);
        } else {
            return board.tileXYZToChess(neighborTileXY.x, neighborTileXY.y, neighborTileZ);
        }
    }
}