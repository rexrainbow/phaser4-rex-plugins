import { IQuadBase } from './IQuadBase';
import { PositionType } from '../IGrid';

export let GetDistance = function (
    quad: IQuadBase,
    tileA: PositionType,
    tileB: PositionType,
    roughMode: boolean = false
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