import {
    ILogicBoard,
    XYType
} from '../ILogicBoard';

export let Offset = function (
    board: ILogicBoard,
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