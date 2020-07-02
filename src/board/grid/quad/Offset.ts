import { IQuadBase } from './IQuadBase';
import { Vec2Type } from '../IGrid';

export let Offset = function (
    quad: IQuadBase,
    srcTileXY: Vec2Type,
    offsetTileX: number,
    offsetTileY: number,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

    if (out === true) {
        out = globTileXY;
    }

    let newTileX = srcTileXY.x + offsetTileX;
    let newTileY = srcTileXY.y + offsetTileY;
    out.x = newTileX;
    out.y = newTileY;
    return out;
}

var globTileXY: Vec2Type = { x: 0, y: 0 };