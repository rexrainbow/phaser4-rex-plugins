import { IBoardBase } from '../IBoardBase';
import { XYType } from '../../types';
import { MirrorMode, MirrorModeString } from '../../grid/IGrid';
import { Offset } from './Offset';

export { MirrorMode, MirrorModeString };

export let Mirror = function (
    board: IBoardBase,
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