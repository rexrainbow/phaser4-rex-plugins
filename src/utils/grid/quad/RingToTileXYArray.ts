import { PositionType } from '../../types/PositionType';
import { Offset } from './Offset';

export function RingToTileXYArray(
    centerTileXY: PositionType,
    radius: number,
    out?: PositionType[]
): PositionType[] {

    if (out === undefined) {
        out = [];
    }

    let i: number, j: number;
    // Top-right to bottom-right
    i = radius;
    for (j = -radius; j <= radius; j++) {
        out.push(Offset(centerTileXY, i, j));
    }
    // Bottom-right to bottom-left
    j = radius;
    for (i = radius - 1; i >= -radius; i--) {
        out.push(Offset(centerTileXY, i, j));
    }
    // Bottom-left to top-left
    i = -radius;
    for (j = radius - 1; j >= -radius; j--) {
        out.push(Offset(centerTileXY, i, j));
    }
    // Top-left to top-right
    j = -radius;
    for (i = -radius + 1; i <= radius - 1; i++) {
        out.push(Offset(centerTileXY, i, j));
    }

    return out;
}