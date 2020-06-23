import { IQuad } from './IQuad';
import { IGetNeighborTileXY } from '../IGrid';
import { GetTileXAtDirection } from './GetTileXYAtDirection';

export let GetNeighborTileXY: IGetNeighborTileXY = function (
    quad: IQuad,
    srcTileXY,
    direction,
    out = {}
) {

    return GetTileXAtDirection(quad, srcTileXY, direction, 1, out);
}