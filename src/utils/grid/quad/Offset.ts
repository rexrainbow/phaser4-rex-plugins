import { IQuad, PositionType } from './IQuad';
import { IOffset } from '../IGrid';

export let Offset: IOffset = function (
    quad: IQuad,
    srcTileXY,
    offsetTileX,
    offsetTileY,
    out = { x: 0, y: 0 }
) {

    if (out === true) {
        out = globTileXY;
    }

    let newTileX = srcTileXY.x + offsetTileX;
    let newTileY = srcTileXY.y + offsetTileY;
    out.x = newTileX;
    out.y = newTileY;
    return out;
}

var globTileXY: PositionType = { x: 0, y: 0 };