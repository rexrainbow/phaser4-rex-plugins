import { IHexagon, LayoutMode } from './IHexagon';
import { PositionType } from '../../types/PositionType';

export function GetWorldXY(
    hexagon: IHexagon,
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

var globWorldXY: PositionType = {};