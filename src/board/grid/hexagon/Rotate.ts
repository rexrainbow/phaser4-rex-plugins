import { IHexagonBase } from './IHexagonBase';
import { Vec2Type } from '../IGrid';
import { cr2cube, cube2cr } from './CubeTransfer';

import { Wrap } from '../../../utils/math/Wrap';

export function Rotate(
    hexagon: IHexagonBase,
    srcTileXY: Vec2Type,
    dir: number,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

    if (out === true) {
        out = globTileXY;
    }

    dir = Wrap(dir, 0, 5);
    let cubeXYZ = cr2cube(hexagon.mode, srcTileXY.x, srcTileXY.y, true);
    let newCubeX: number,
        newCubeY: number,
        newCubeZ: number;

    switch (dir) {
        case 1:
            newCubeX = -cubeXYZ.z;
            newCubeY = -cubeXYZ.x;
            newCubeZ = -cubeXYZ.y;
            break;
        case 2:
            newCubeX = cubeXYZ.y;
            newCubeY = cubeXYZ.z;
            newCubeZ = cubeXYZ.x;
            break;
        case 3:
            newCubeX = -cubeXYZ.x;
            newCubeY = -cubeXYZ.y;
            newCubeZ = -cubeXYZ.z;
            break;
        case 4:
            newCubeX = cubeXYZ.z;
            newCubeY = cubeXYZ.x;
            newCubeZ = cubeXYZ.y;
            break;
        case 5:
            newCubeX = -cubeXYZ.y;
            newCubeY = -cubeXYZ.z;
            newCubeZ = -cubeXYZ.x;
            break;
        default:
            newCubeX = cubeXYZ.x;
            newCubeY = cubeXYZ.y;
            newCubeZ = cubeXYZ.z;
            break;
    }

    cube2cr(hexagon.mode, newCubeX, newCubeY, newCubeZ, out);
    return out;
}

let globTileXY: Vec2Type = { x: 0, y: 0 };