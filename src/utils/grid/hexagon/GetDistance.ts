import { IHexagon } from './IHexagon';
import { IGetDistance } from '../IGrid';
import { cr2cube, CubeType } from './CubeTransfer';

export let GetDistance: IGetDistance = function (
    hexagon: IHexagon,
    tileA,
    tileB,
    roughMode = false
) {

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