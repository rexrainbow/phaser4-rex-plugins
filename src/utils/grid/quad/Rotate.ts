import { PositionType } from '../../types/PositionType';
import { Wrap } from '../../math/Wrap';

export function Rotate(
    srcTileXY: PositionType,
    dir: number,
    out: PositionType | true = {}
): PositionType {

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

let globTileXY: PositionType = {};