import { IQuadBase } from './IQuadBase';
import { PositionType } from '../IGrid';

export let Offset = function (
    quad: IQuadBase,
    srcTileXY: PositionType,
    offsetTileX: number,
    offsetTileY: number,
    out: PositionType | true = { x: 0, y: 0 }
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