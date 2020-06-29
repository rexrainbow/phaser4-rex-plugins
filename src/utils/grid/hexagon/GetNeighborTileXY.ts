import { IHexagon } from './IHexagon';
import { IGetNeighborTileXY } from '../IGrid';
import { GetTileXYAtDirection } from './GetTileXYAtDirection';

export let GetNeighborTileXY: IGetNeighborTileXY = function (
    hexragon: IHexagon,
    srcTileXY,
    direction,
    out = { x: 0, y: 0 }
) {

    return GetTileXYAtDirection(hexragon, srcTileXY, direction, 1, out);
};