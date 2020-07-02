import { IHexagonBase } from './IHexagonBase';
import { Vec2Type } from '../IGrid';
import { DirectionToDeltaTileXY } from './DirectionToDeltaTileXY';
import { GetParity } from './GetParity';
import { cr2cube, cube2cr } from './CubeTransfer';

export let GetTileXYAtDirection = function (
    hexragon: IHexagonBase,
    srcTileXY: Vec2Type,
    direction: number,
    distance: number,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

    if (out === true) {
        out = globTileXY;
    }

    let mode = hexragon.mode;
    let srcTileX = srcTileXY.x,
        srcTileY = srcTileXY.y;

    if (distance === 1) { // Neighbor
        let parity = GetParity(mode, srcTileX, srcTileY);
        out.x = srcTileX + DirectionToDeltaTileXY[mode][parity][direction][0];
        out.y = srcTileY + DirectionToDeltaTileXY[mode][parity][direction][1];
    } else if (distance === 0) {
        out.x = srcTileX;
        out.y = srcTileY;
    } else {
        let cubeXYZ = cr2cube(mode, srcTileX, srcTileY, true);
        let newCubeX: number,
            newCubeY: number,
            newCubeZ: number;

        switch (direction) {
            case 1:
                newCubeX = cubeXYZ.x;
                newCubeY = cubeXYZ.y - distance;
                newCubeZ = cubeXYZ.z + distance;
                break;
            case 2:
                newCubeX = cubeXYZ.x - distance;
                newCubeY = cubeXYZ.y;
                newCubeZ = cubeXYZ.z + distance;
                break;
            case 3:
                newCubeX = cubeXYZ.x - distance;
                newCubeY = cubeXYZ.y + distance;
                newCubeZ = cubeXYZ.z;
                break;
            case 4:
                newCubeX = cubeXYZ.x;
                newCubeY = cubeXYZ.y + distance;
                newCubeZ = cubeXYZ.z - distance;
                break;
            case 5:
                newCubeX = cubeXYZ.x + distance;
                newCubeY = cubeXYZ.y;
                newCubeZ = cubeXYZ.z - distance;
                break;
            default:
                newCubeX = cubeXYZ.x + distance;
                newCubeY = cubeXYZ.y - distance;
                newCubeZ = cubeXYZ.z;
                break;
        }
        cube2cr(mode, newCubeX, newCubeY, newCubeZ, out);
    }

    return out;
}

var globTileXY: Vec2Type = { x: 0, y: 0 };