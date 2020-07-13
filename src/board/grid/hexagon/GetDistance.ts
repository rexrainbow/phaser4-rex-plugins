import { IHexagonBase } from './IHexagonBase';
import { Vec2Type } from '../IGrid';
import { cr2cube, CubeType } from './CubeTransfer';

export function GetDistance(
    hexagon: IHexagonBase,
    tileA: Vec2Type,
    tileB: Vec2Type,
    roughMode: boolean = false
): number {

    cr2cube(hexagon.mode, tileA.x, tileA.y, globCubeA);
    cr2cube(hexagon.mode, tileB.x, tileB.y, globCubeB);
    let dx = globCubeB.x - globCubeA.x;
    let dy = globCubeB.y - globCubeA.y;
    let dz = globCubeB.z - globCubeA.z;
    return (Math.abs(dx) + Math.abs(dy) + Math.abs(dz)) / 2;
}

let globCubeA: CubeType = { x: 0, y: 0, z: 0 };
let globCubeB: CubeType = { x: 0, y: 0, z: 0 };

export default GetDistance;