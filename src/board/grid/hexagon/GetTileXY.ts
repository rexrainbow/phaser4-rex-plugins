import { IHexagonBase, LayoutMode } from './IHexagonBase';
import { Vec2Type } from '../IGrid';
import { qr2cube, roundcube, cube2cr, CubeType } from './CubeTransfer';

const C_4div3 = (4 / 3);
const C_2div3 = (2 / 3);

export let GetTileXY = function (
    hexagon: IHexagonBase,
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

    worldX -= hexagon.x;
    worldY -= hexagon.y;
    let q: number,
        r: number;

    switch (hexagon.mode) {
        case LayoutMode.ODD_R:
        case LayoutMode.EVEN_R:
            r = (worldY * C_4div3) / hexagon.height;
            q = (worldX / hexagon.width) - C_2div3 * (worldY / hexagon.height);
            break;

        case LayoutMode.ODD_Q:
        case LayoutMode.EVEN_Q:
            r = (worldY / hexagon.height) - C_2div3 * (worldX / hexagon.width);
            q = (worldX * C_4div3) / hexagon.width;
            break;
    }

    let cube = qr2cube(q, r, globCube);
    roundcube(cube);
    cube2cr(hexagon.mode, cube.x, cube.y, cube.z, out);
    return out;
}

let globCube: CubeType = { x: 0, y: 0, z: 0 };
let globTileXY: Vec2Type = { x: 0, y: 0 };
