import { IHexagonBase } from './IHexagonBase';
import { Vec2Type } from '../IGrid';

export function GetOppositeDirection(
    hexagon: IHexagonBase,
    tileX: number | Vec2Type,
    tileY: number | undefined | null,
    direction
): number {

    return (direction + 3) % 6;
};