import {
    ILogicBoard,
    IChess, XYZType, XYType
} from '../ILogicBoard';
import { IsTileXYZ } from '../utils/IsTileXYZ';

export let ChessToTileXYZ = function (
    board: ILogicBoard,
    chess: IChess | XYZType | XYType
): XYZType | XYType | null {

    let xyz: XYZType | undefined = board.boardData.getXYZ(chess);
    if (xyz) {
        return xyz;
    } else if (IsTileXYZ(chess)) { // {x, y}, or {x, y, z}
        return chess as XYType;
    } else {
        return null;
    }

}