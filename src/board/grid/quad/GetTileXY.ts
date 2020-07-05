import { IQuadBase, LayoutMode } from './IQuadBase';
import { Vec2Type } from '../IGrid';

export let GetTileXY = function (
    quad: IQuadBase,
    worldX: number | Vec2Type,
    worldY?: number,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

    if (typeof (worldX) === 'object') {
        worldY = worldX.y;
        worldX = worldX.x;
    }

    if (out === true) {
        out = globTileXY;
    }

    worldX -= quad.x;
    worldY -= quad.y;
    let tmpx = worldX / quad.width;
    let tmpy = worldY / quad.height;
    switch (quad.mode) {
        case LayoutMode.orthogonal:
            out.x = Math.round(tmpx);
            out.y = Math.round(tmpy);
            break;
        case LayoutMode.isometric:
            out.x = Math.round(+tmpx + tmpy);
            out.y = Math.round(-tmpx + tmpy);
            break;
    }
    return out;
};

let globTileXY: Vec2Type = { x: 0, y: 0 };