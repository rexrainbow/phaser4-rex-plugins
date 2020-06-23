import { IQuad, LayoutMode } from './IQuad';
import { IGetTileXAtDirection } from '../IGrid';
import { PositionType } from '../../types/PositionType';
import { OrthogonalMap, IsometricMap } from './DirectionToDeltaXY';

export let GetTileXAtDirection: IGetTileXAtDirection = function (
    quad: IQuad,
    srcTileXY,
    direction,
    distance,
    out = {}
): PositionType {

    if (out === true) {
        out = globTileXY;
    }

    let deltaTileX: number,
        deltaTileY: number;
    switch (quad.mode) {
        case LayoutMode.orthogonal:
            deltaTileX = OrthogonalMap[direction][0];
            deltaTileY = OrthogonalMap[direction][1];
            break;
        case LayoutMode.isometric:
            deltaTileX = IsometricMap[direction][0];
            deltaTileY = IsometricMap[direction][1];
            break;
    }

    if (distance === 1) { // Neighbor
        out.x = srcTileXY.x + deltaTileX;
        out.y = srcTileXY.y + deltaTileY;
    } else {
        out.x = srcTileXY.x + (distance * deltaTileX);
        out.y = srcTileXY.y + (distance * deltaTileY);
    }
    return out;

}

var globTileXY: PositionType = {};