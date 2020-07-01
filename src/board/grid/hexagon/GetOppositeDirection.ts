import { IHexagonBase } from './IHexagonBase';
import { PositionType } from '../IGrid';

export let GetOppositeDirection = function (
    hexagon: IHexagonBase,
    tileX: PositionType,
    tileY: PositionType,
    direction
): number {

    return (direction + 3) % 6;
};