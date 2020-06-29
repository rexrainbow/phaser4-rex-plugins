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

var globCubeA: CubeType = { x: 0, y: 0, z: 0 };
var globCubeB: CubeType = { x: 0, y: 0, z: 0 };

export default GetDistance;