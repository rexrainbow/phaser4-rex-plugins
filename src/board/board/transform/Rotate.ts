import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../types';
import { Offset } from './Offset';

export let Rotate = function (
    board: IBaseBoard,
    tileXY: XYType,
    direction: number,
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
    board.grid.rotate(out, direction, out);
    if (originTileXY !== null) {
        Offset(board, out, originTileXY.x, originTileXY.y, out);
    }
    return out;
};

let globTileXY: XYType = { x: 0, y: 0 };