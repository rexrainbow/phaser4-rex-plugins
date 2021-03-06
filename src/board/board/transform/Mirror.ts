import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';
import { MirrorMode, MirrorModeString } from '../../grid/IGrid';
import { Offset } from './Offset';

export { MirrorMode, MirrorModeString };

export function Mirror(
    board: IBaseBoard,
    tileXY: XYType,
    mode: MirrorMode | MirrorModeString,
    originTileXY: XYType | null = null,
    out: XYType | true = { x: 0, y: 0 }
): XYType {

    if (out === true) {
        out = globTileXY;
    }

    if (originTileXY !== null) {
        Offset(board, tileXY, -originTileXY.x, -originTileXY.y, out);
    } else {
        out.x = tileXY.x;
        out.y = tileXY.y;
    }
    board.grid.mirror(out, mode, out);
    if (originTileXY !== null) {
        Offset(board, out, originTileXY.x, originTileXY.y, out);
    }
    return out;
};

let globTileXY: XYType = { x: 0, y: 0 };