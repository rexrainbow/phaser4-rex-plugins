import { IQuadBase } from './IQuadBase';
import { PositionType } from '../IGrid';
import { GetTileXYAtDirection } from './GetTileXYAtDirection';

export let GetNeighborTileXY = function (
    quad: IQuadBase,
    srcTileXY: PositionType,
    direction: number,
    out: PositionType | true = { x: 0, y: 0 }
) {

    return GetTileXYAtDirection(quad, srcTileXY, direction, 1, out);
}