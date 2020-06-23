import { IQuad } from './IQuad';
import { IGetDistance } from '../IGrid';

export let GetDistance: IGetDistance = function (
    quad: IQuad,
    tileA,
    tileB,
    roughMode = false
) {

    let dx = tileB.x - tileA.x;
    let dy = tileB.y - tileA.y;
    let dist: number;
    if (roughMode) {
        dist = Math.abs(dx) + Math.abs(dy);
    } else {
        dist = Math.sqrt(dx * dx + dy * dy);
    }
    return dist;
}