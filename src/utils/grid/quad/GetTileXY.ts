import { IQuad, LayoutMode } from './IQuad'
import { PositionType } from '../../types/PositionType';

export function GetTileXY(
    quad: IQuad,
    worldX: number | PositionType,
    worldY?: number,
    out: PositionType | true = {}
): PositionType {

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

var globTileXY: PositionType = {};