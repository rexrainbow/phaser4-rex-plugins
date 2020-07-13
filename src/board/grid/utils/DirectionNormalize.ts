import { IGrid } from '../IGrid';
import { Wrap } from '../../../utils/math/Wrap';

export function DirectionNormalize(
    grid: IGrid,
    direction: number
): number {

    return Wrap(direction, 0, grid.directions);
}