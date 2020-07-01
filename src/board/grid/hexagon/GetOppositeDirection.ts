import { IHexagonBase } from './IHexagonBase';
import { PositionType } from '../IGrid';

export let GetOppositeDirection = function (
    hexagon: IHexagonBase,
    tileX: number | PositionType,
    tileY: number | undefined | null,
    direction
): number {

    return (direction + 3) % 6;
};