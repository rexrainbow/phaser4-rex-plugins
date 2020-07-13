import { IHexagonBase } from './IHexagonBase';
import { Vec2Type } from '../IGrid';
import { cr2cube, cube2cr } from './CubeTransfer';

export function RingToTileXYArray(
    hexagon: IHexagonBase,
    centerTileXY: Vec2Type,
    radius: number,
    out: Vec2Type[] = []
): Vec2Type[] {

    let centerCube = cr2cube(hexagon.mode, centerTileXY.x, centerTileXY.y, true);
    let cx = centerCube.x,
        cy = centerCube.y,
        cz = centerCube.z;
    let i: number,
        j: number,
        k: number;

    k = radius;
    for (i = 0; i >= -radius; i--) {
        j = -i - k;
        out.push(cube2cr(hexagon.mode, cx + i, cy + j, cz + k));
    }

    i = -radius;
    for (j = 1; j <= radius; j++) {
        k = -i - j;
        out.push(cube2cr(hexagon.mode, cx + i, cy + j, cz + k));
    }

    j = radius;
    for (k = -1; k >= -radius; k--) {
        i = -j - k;
        out.push(cube2cr(hexagon.mode, cx + i, cy + j, cz + k));
    }

    k = -radius;
    for (i = 1; i <= radius; i++) {
        j = -i - k;
        out.push(cube2cr(hexagon.mode, cx + i, cy + j, cz + k));
    }

    i = radius;
    for (j = -1; j >= -radius; j--) {
        k = -i - j;
        out.push(cube2cr(hexagon.mode, cx + i, cy + j, cz + k));
    }

    j = -radius;
    for (k = 1; k <= radius - 1; k++) {
        i = -j - k;
        out.push(cube2cr(hexagon.mode, cx + i, cy + j, cz + k));
    }
    return out;
}