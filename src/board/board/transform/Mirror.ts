import {
    ILogicBoard,
    XYType,
    MirrorMode, MirrorModeString
} from '../ILogicBoard';

export let Mirror = function (
    board: ILogicBoard,
    tileXY: XYType,
    mode: MirrorMode | MirrorModeString,
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
    board.grid.mirror(out, mode, out);
    if (originTileXY !== null) {
        board.offset(out, originTileXY.x, originTileXY.y, out);
    }
    return out;
};

let globTileXY: XYType = { x: 0, y: 0 };