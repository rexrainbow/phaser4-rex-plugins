import { IQuad } from './IQuad';
import { PositionType } from '../../types/PositionType'

export function Offset(
    quad: IQuad,
    srcTileXY: PositionType,
    offsetTileX: number,
    offsetTileY: number,
    out: PositionType | true = {}
): PositionType {

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