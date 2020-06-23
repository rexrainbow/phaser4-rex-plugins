import { IHexagon } from './IHexagon';
import { IGetOppositeDirection } from '../IGrid';

export let GetOppositeDirection: IGetOppositeDirection = function (
    hexagon: IHexagon,
    tileX,
    tileY,
    direction
) {

    return (direction + 3) % 6;
};