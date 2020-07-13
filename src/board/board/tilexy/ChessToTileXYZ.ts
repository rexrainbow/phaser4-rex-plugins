import { IBaseBoard } from '../IBaseBoard';
import { IChess, XYZType, XYType } from '../../Types';
import { IsTileXYZ } from '../../utils/IsTileXYZ';

export function ChessToTileXYZ(
    board: IBaseBoard,
    chess: IChess | XYZType | XYType
): XYType | null {

    let xyz: XYZType | undefined = board.boardData.getXYZ(chess);
    if (xyz) {
        return xyz;
    } else if (IsTileXYZ(chess)) { // {x, y}, or {x, y, z}
        return chess as XYType;
    } else {
        return null;
    }

}