import { IHexagon, PositionType } from './IHexagon';
import { IRotate } from '../IGrid';
import { cr2cube, cube2cr } from './CubeTransfer';

import { Wrap } from '../../math/Wrap';

export let Rotate: IRotate = function (
    hexagon: IHexagon,
    srcTileXY,
    dir,
    out = { x: 0, y: 0 }
) {

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

var globTileXY: PositionType = { x: 0, y: 0 };