import { IQuadBase } from './IQuadBase';
import { Vec2Type } from '../IGrid';

export let GetDistance = function (
    quad: IQuadBase,
    tileA: Vec2Type,
    tileB: Vec2Type,
    roughMode: boolean = false
): number {

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