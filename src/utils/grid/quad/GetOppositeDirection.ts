import { IQuad } from './IQuad';
import { PositionType } from '../../types/PositionType';

export function GetOppositeDirection(
    quad: IQuad,
    tileX: number | PositionType,
    tileY: number | undefined | null,
    direction?: number
): number {

    return oppositeDirectionMap[direction];
}

const oppositeDirectionMap = {
    0: 2,  // Left
    1: 3,  // Down
    2: 0,  // Right
    3: 1,  // Up
    4: 6,  // Left-down
    5: 7,  // Down-right
    6: 4,  // Right-up
    7: 5   // Up-left
}