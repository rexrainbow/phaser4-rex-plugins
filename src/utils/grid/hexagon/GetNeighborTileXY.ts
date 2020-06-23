import { IHexagon } from './IHexagon';
import { IGetNeighborTileXY } from '../IGrid';
import { GetTileXAtDirection } from './GetTileXYAtDirection';

export let GetNeighborTileXY: IGetNeighborTileXY = function (
    hexragon: IHexagon,
    srcTileXY,
    direction,
    out = {}
) {

    return GetTileXAtDirection(hexragon, srcTileXY, direction, 1, out);
};