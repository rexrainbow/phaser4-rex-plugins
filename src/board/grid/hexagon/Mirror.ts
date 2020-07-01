import { IHexagonBase, LayoutMode } from './IHexagonBase';
import {
    PositionType,
    MirrorMode, MirrorModeString
} from '../IGrid';
import { cr2cube, cube2cr } from './CubeTransfer';

export let Mirror = function (
    hexagon: IHexagonBase,
    srcTileXY: PositionType,
    mode: MirrorMode | MirrorModeString,
    out: PositionType | true = { x: 0, y: 0 }
): PositionType {

    if (typeof (mode) === 'string') {
        mode = MirrorMode[mode];
    }

    if (out === true) {
        out = globTileXY;
    }

    let cubeXYZ = cr2cube(hexagon.mode, srcTileXY.x, srcTileXY.y, true);
    let isRMode = (hexagon.mode === LayoutMode.ODD_R) || (hexagon.mode === LayoutMode.EVEN_R);
    let newCubeX: number,
        newCubeY: number,
        newCubeZ: number;

    if (mode & 1) { // Mirror x
        if (isRMode) {
            newCubeX = cubeXYZ.y;
            newCubeY = cubeXYZ.x;
            newCubeZ = cubeXYZ.z;
        } else {
            newCubeX = -cubeXYZ.x;
            newCubeY = -cubeXYZ.z;
            newCubeZ = -cubeXYZ.y;
        }
        cubeXYZ.x = newCubeX;
        cubeXYZ.y = newCubeY;
        cubeXYZ.z = newCubeZ;
    }
    if (mode & 2) { // Mirror y
        if (isRMode) {
            newCubeX = -cubeXYZ.y;
            newCubeY = -cubeXYZ.x;
            newCubeZ = -cubeXYZ.z;
        } else {
            newCubeX = cubeXYZ.x;
            newCubeY = cubeXYZ.z;
            newCubeZ = cubeXYZ.y;
        }
    }
    cube2cr(hexagon.mode, newCubeX, newCubeY, newCubeZ, out);
    return out;
}

var globTileXY: PositionType = { x: 0, y: 0 };

export default Mirror;