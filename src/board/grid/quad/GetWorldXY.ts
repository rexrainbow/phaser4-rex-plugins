import { IQuadBase, LayoutMode } from './IQuadBase';
import { Vec2Type } from '../IGrid';

export function GetWorldXY(
    quad: IQuadBase,
    tileX: number | Vec2Type,
    tileY: number,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

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
        case LayoutMode.isometric:
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

let globWorldXY: Vec2Type = { x: 0, y: 0 };