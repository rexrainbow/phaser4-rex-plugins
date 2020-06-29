import { IHexagon } from './IHexagon';
import { IDirectionBetween } from '../IGrid';
import { cr2cube, CubeType } from './CubeTransfer';

export let DirectionBetween: IDirectionBetween = function (
    hexagon: IHexagon,
    tileA,
    tileB,
    round = true
) {

    let direction: number;
    cr2cube(hexagon.mode, tileA.x, tileA.y, globCubeA);
    cr2cube(hexagon.mode, tileB.x, tileB.y, globCubeB);
    let dx = globCubeB.x - globCubeA.x;
    let dy = globCubeB.y - globCubeA.y;
    let dz = globCubeB.z - globCubeA.z;
    if (dz === 0) {
        direction = (dx > 0) ? 0 : 3;
    } else if (dx === 0) {
        direction = (dz > 0) ? 1 : 4;
    } else if (dy === 0) {
        direction = (dz > 0) ? 2 : 5;
    } else if ((dx > 0) && (dy < 0) && (dz > 0)) { // 0~1
        direction = 0 + (dz / (-dy));
    } else if ((dx < 0) && (dy < 0) && (dz > 0)) { // 1~2
        direction = 1 + ((-dy) / dz);
    } else if ((dx < 0) && (dy > 0) && (dz > 0)) { // 2~3
        direction = 2 + (dy / (-dx));
    } else if ((dx < 0) && (dy > 0) && (dz < 0)) { // 3~4
        direction = 3 + ((-dz) / dy);
    } else if ((dx > 0) && (dy > 0) && (dz < 0)) { // 4~5
        direction = 4 + (dx / (-dz));
    } else { // ((dx > 0) && (dy < 0) && (dz < 0)) // 5~0
        direction = 5 + ((-dy) / dx);
    }

    if (round) {
        direction = Math.round(direction);
    }
    return direction;
}

var globCubeA: CubeType = { x: 0, y: 0, z: 0 };
var globCubeB: CubeType = { x: 0, y: 0, z: 0 };