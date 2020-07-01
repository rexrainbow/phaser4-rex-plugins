import { IQuadBase } from './IQuadBase';
import { PositionType, MirrorMode, MirrorModeString } from '../IGrid';

export let Mirror = function (
    quad: IQuadBase,
    srcTileXY: PositionType,
    mode: MirrorMode | MirrorModeString,
    out: PositionType | true = { x: 0, y: 0 }
): PositionType {

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

var globTileXY: PositionType = { x: 0, y: 0 };