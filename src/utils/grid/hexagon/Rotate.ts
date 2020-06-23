import { IHexagon } from './IHexagon';
import { PositionType } from '../../types/PositionType';
import { cr2cube, cube2cr } from './CubeTransfer';

import { Wrap } from '../../math/Wrap';

export function Rotate(
    hexagon: IHexagon,
    srcTileXY: PositionType,
    dir: number,
    out: PositionType | true = {}
): PositionType {

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

var globTileXY: PositionType = {};