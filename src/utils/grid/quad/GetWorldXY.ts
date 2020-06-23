import { IQuad, LayoutMode } from './IQuad'
import { PositionType } from '../../types/PositionType';

export function GetWorldXY(
    quad: IQuad,
    tileX: number | PositionType,
    tileY?: number,
    out: PositionType | true = {}
): PositionType {
    
    if (typeof (tileX) === 'object') {
        tileY = tileX.y;
        tileX = tileX.x;
    }

    if (out === true) {
        out = globWorldXY;
    }

    let worldX, worldY;
    switch (quad.mode) {
        case LayoutMode.orthogonal:
            worldX = tileX * quad.width;
            worldY = tileY * quad.height;
            break;
        case LayoutMode.isometric: // isometric
            worldX = (tileX - tileY) * quad._halfWidth;
            worldY = (tileX + tileY) * quad._halfHeight;
            break;
    }
    worldX += quad.x;
    worldY += quad.y;
    out.x = worldX;
    out.y = worldY;
    return out;

};

var globWorldXY: PositionType = {};