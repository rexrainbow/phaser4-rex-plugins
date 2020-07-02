import { IHexagonBase } from './IHexagonBase';
import { Vec2Type } from '../IGrid';

export let GetOppositeDirection = function (
    hexagon: IHexagonBase,
    tileX: number | Vec2Type,
    tileY: number | undefined | null,
    direction
): number {

    return (direction + 3) % 6;
};