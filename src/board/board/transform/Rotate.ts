import {
    ILogicBoard,
    XYType
} from '../ILogicBoard';

export let Rotate = function (
    board: ILogicBoard,
    tileXY: XYType,
    direction: number,
    originTileXY: XYType | null = null,
    out: XYType | true = { x: 0, y: 0 }
): XYType {

    if (out === true) {
        out = globTileXY;
    }

    if (originTileXY !== null) {
        board.offset(tileXY, -originTileXY.x, -originTileXY.y, out);
    } else {
        out.x = tileXY.x;
        out.y = tileXY.y;
    }
    board.grid.rotate(out, direction, out);
    if (originTileXY !== null) {
        board.offset(out, originTileXY.x, originTileXY.y, out);
    }
    return out;
};

var globTileXY: XYType = { x: 0, y: 0 };