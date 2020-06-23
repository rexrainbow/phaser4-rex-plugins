import { IHexagon } from './IHexagon';
import { PositionType } from '../../types/PositionType';
import { cr2cube, CubeType } from './CubeTransfer';

export function GetDistance(
    hexagon: IHexagon,
    tileA: PositionType,
    tileB: PositionType,
    roughMode: boolean = false
): number {

    cr2cube(hexagon.mode, tileA.x, tileA.y, globCubeA);
    cr2cube(hexagon.mode, tileB.x, tileB.y, globCubeB);
    let dx = globCubeB.x - globCubeA.x;
    let dy = globCubeB.y - globCubeA.y;
    let dz = globCubeB.z - globCubeA.z;
    return (Math.abs(dx) + Math.abs(dy) + Math.abs(dz)) / 2;
}

var globCubeA: CubeType = {};
var globCubeB: CubeType = {};

export default GetDistance;