import { IHexagon } from './IHexagon';
import { PositionType } from '../../types/PositionType';

export function GetOppositeDirection(
    hexagon: IHexagon,
    tileX: number | PositionType,
    tileY: number | undefined | null,
    direction?: number
): number {

    return (direction + 3) % 6;
};