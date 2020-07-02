import { IQuadBase } from './IQuadBase';
import { Vec2Type, MirrorMode, MirrorModeString } from '../IGrid';

export let Mirror = function (
    quad: IQuadBase,
    srcTileXY: Vec2Type,
    mode: MirrorMode | MirrorModeString,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

    if (typeof (mode) === 'string') {
        mode = MirrorMode[mode];
    }

    if (out === true) {
        out = globTileXY;
    }

    out.x = (mode & 1) ? -srcTileXY.x : srcTileXY.x;
    out.y = (mode & 2) ? -srcTileXY.y : srcTileXY.y;
    return out;
}

var globTileXY: Vec2Type = { x: 0, y: 0 };