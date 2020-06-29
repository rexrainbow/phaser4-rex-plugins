import { IQuad } from './IQuad';
import { IGetNeighborTileXY } from '../IGrid';
import { GetTileXYAtDirection } from './GetTileXYAtDirection';

export let GetNeighborTileXY: IGetNeighborTileXY = function (
    quad: IQuad,
    srcTileXY,
    direction,
    out = { x: 0, y: 0 }
) {

    return GetTileXYAtDirection(quad, srcTileXY, direction, 1, out);
}