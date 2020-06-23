import { IQuad } from './IQuad';
import { IOffset } from '../IGrid';
import { PositionType } from '../../types/PositionType'

export let Offset: IOffset = function (
    quad: IQuad,
    srcTileXY,
    offsetTileX,
    offsetTileY,
    out = {}
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

var globTileXY: PositionType = {};