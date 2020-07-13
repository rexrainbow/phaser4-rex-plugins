import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';


export function Offset(
    board: IBaseBoard,
    tileXY: XYType,
    offsetTileX: number,
    offsetTileY: number,
    out: XYType | true = { x: 0, y: 0 }
): XYType {

    if (out === true) {
        out = globTileXY;
    }

    if ((offsetTileX === 0) && (offsetTileY === 0)) {
        out.x = tileXY.x;
        out.y = tileXY.y;
    } else {
        board.grid.offset(tileXY, offsetTileX, offsetTileY, out);
    }
    return out;
};

let globTileXY: XYType = { x: 0, y: 0 };