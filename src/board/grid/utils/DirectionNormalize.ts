import { IGrid } from '../IGrid';
import { Wrap } from '../../../utils/math/Wrap';

export let DirectionNormalize = function (
    grid: IGrid,
    direction: number
): number {

    return Wrap(direction, 0, grid.directions);
}