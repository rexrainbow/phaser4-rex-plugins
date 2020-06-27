import {
    ILogicBoard,
    XYType, XYZType
} from '../ILogicBoard';
import { IsTileXYZ } from '../utils/IsTileXYZ';

export let ChessToTileXYZ = function (
    board: ILogicBoard,
    chess: any
): XYZType | object | null {

    let xyz: XYZType | undefined = board.boardData.getXYZ(chess);
    if (xyz) {
        return xyz;
    } else if (IsTileXYZ(chess)) { // {x, y}, or {x, y, z}
        return chess;
    } else {
        return null;
    }

}