import { PositionType } from '../../types/PositionType';
import { MirrorMode, MirrorModeString } from '../MirrorMode';

export function Mirror(
    srcTileXY: PositionType,
    mode: number | MirrorMode | MirrorModeString,
    out: PositionType | true = {}
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

var globTileXY: PositionType = {};