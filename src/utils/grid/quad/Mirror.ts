import { IQuad } from './IQuad';
import { IMirror } from '../IGrid';
import { PositionType } from '../../types/PositionType';
import { MirrorMode, MirrorModeString } from '../MirrorMode';

export let Mirror: IMirror = function (
    quad: IQuad,
    srcTileXY,
    mode: MirrorMode | MirrorModeString,
    out = {}
) {

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