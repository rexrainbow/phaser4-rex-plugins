import { IHexagon, LayoutMode } from './IHexagon';
import { IGetWorldXY } from '../IGrid';
import { PositionType } from '../../types/PositionType';

export let GetWorldXY: IGetWorldXY = function (
    hexagon: IHexagon,
    tileX,
    tileY,
    out = {}
) {

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