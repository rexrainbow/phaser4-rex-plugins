import { IQuad } from './IQuad';
import { PositionType } from '../../types/PositionType'

export function GetDistance(
    quad: IQuad,
    tileA: PositionType,
    tileB: PositionType,
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