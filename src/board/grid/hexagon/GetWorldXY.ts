import { IHexagonBase, LayoutMode } from './IHexagonBase';
import { Vec2Type } from '../IGrid';

export function GetWorldXY(
    hexagon: IHexagonBase,
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

    let worldX = (tileX * hexagon.width);
    let worldY = (tileY * hexagon.height);
    switch (hexagon.mode) {
        case LayoutMode.ODD_R:
            if (tileY & 1) {
                worldX += hexagon._halfWidth;
            }
            worldY *= 0.75;
            break;

        case LayoutMode.EVEN_R:
            if (tileY & 1) {
                worldX -= hexagon._halfWidth;
            }
            worldY *= 0.75;
            break;

        case LayoutMode.ODD_Q:
            worldX *= 0.75;
            if (tileX & 1) {
                worldY += hexagon._halfHeight;
            }
            break;

        case LayoutMode.EVEN_Q:
            worldX *= 0.75;
            if (tileX & 1) {
                worldY -= hexagon._halfHeight;
            }
            break;
    }
    worldX += hexagon.x;
    worldY += hexagon.y;
    out.x = worldX;
    out.y = worldY;
    return out;
}

let globWorldXY: Vec2Type = { x: 0, y: 0 };