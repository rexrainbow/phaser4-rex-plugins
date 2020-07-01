import { IHexagonBase } from './IHexagonBase';
import { PositionType } from '../IGrid';
import { GetTileXYAtDirection } from './GetTileXYAtDirection';

export let GetNeighborTileXY = function (
    hexragon: IHexagonBase,
    srcTileXY: PositionType,
    direction: number,
    out: PositionType | true = { x: 0, y: 0 }
): PositionType {

    return GetTileXYAtDirection(hexragon, srcTileXY, direction, 1, out);
};