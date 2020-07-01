import { IQuadBase } from './IQuadBase';
import { PositionType } from '../IGrid';
import { Wrap } from '../../../utils/math/Wrap';

export let Rotate = function (
    quad: IQuadBase,
    srcTileXY: PositionType,
    dir: number,
    out: PositionType | true = { x: 0, y: 0 }
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