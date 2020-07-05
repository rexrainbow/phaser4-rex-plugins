import { IQuadBase, LayoutMode } from './IQuadBase';
import { Vec2Type } from '../IGrid';
import { OrthogonalMap, IsometricMap } from './DirectionToDeltaXY';

export let GetTileXYAtDirection = function (
    quad: IQuadBase,
    srcTileXY: Vec2Type,
    direction: number,
    distance: number,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

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

let globTileXY: Vec2Type = { x: 0, y: 0 };