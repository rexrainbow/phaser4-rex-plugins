import { IBaseBoard } from '../IBaseBoard';
import { XType, YType, XYType } from '../../types';
import { Wrap } from '../../../utils/math/Wrap';

export let GetWrapTileXY = function (
    board: IBaseBoard,
    tileX: XType,
    tileY: YType,
    out: XYType | true = { x: 0, y: 0 }
): XYType {

    if (out === true) {
        out = globTileXY;
    }

    if (board.wrapMode) {
        tileX = Wrap(tileX, 0, board.width);
    } else if ((!board.infinityMode) &&
        ((tileX < 0) || (tileX >= board.width))) {
        tileX = null;
    }
    if (board.wrapMode) {
        tileY = Wrap(tileY, 0, board.height);
    } else if ((!board.infinityMode) &&
        ((tileY < 0) || (tileY >= board.height))) {
        tileY = null;
    }
    out.x = tileX;
    out.y = tileY;
    return out;
}

let globTileXY: XYType = { x: 0, y: 0 };