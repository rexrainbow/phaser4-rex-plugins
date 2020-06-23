import { IQuad } from './IQuad';
import { IRotateCallback } from '../IGrid';
import { PositionType } from '../../types/PositionType';
import { Wrap } from '../../math/Wrap';

export let Rotate: IRotateCallback = function (
    quad: IQuad,
    srcTileXY,
    dir,
    out = {}
) {

    if (out === true) {
        out = globTileXY;
    }

    dir = Wrap(dir, 0, 3);
    let newTileX: number,
        newTileY: number;
    switch (dir) {
        case 1:
            newTileX = -srcTileXY.y;
            newTileY = srcTileXY.x;
            break;
        case 2:
            newTileX = -srcTileXY.x;
            newTileY = -srcTileXY.y;
            break;
        case 3:
            newTileX = srcTileXY.y;
            newTileY = -srcTileXY.x;
            break;
        default:
            newTileX = srcTileXY.x;
            newTileY = srcTileXY.y;
            break;
    }
    out.x = newTileX;
    out.y = newTileY;
    return out;
}

var globTileXY: PositionType = {};