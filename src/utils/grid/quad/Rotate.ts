import { IQuad, PositionType } from './IQuad';
import { IRotate } from '../IGrid';
import { Wrap } from '../../math/Wrap';

export let Rotate: IRotate = function (
    quad: IQuad,
    srcTileXY,
    dir,
    out = {x:0, y:0}
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

var globTileXY: PositionType = { x: 0, y: 0 };