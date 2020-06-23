import { PositionType } from '../../types/PositionType';

export enum MirrorMode {
    x = 1,
    horizontal = 1,
    h = 1,
    y = 2,
    vertical = 2,
    v = 2,
    xy = 3,
}

export type MirrorModeString = 'x' | 'y' | 'xy' | 'vertical' | 'horizontal' | 'v' | 'h';

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

let globTileXY: PositionType = {};