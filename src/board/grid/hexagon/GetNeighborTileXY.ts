import { IHexagonBase } from './IHexagonBase';
import { Vec2Type } from '../IGrid';
import { GetTileXYAtDirection } from './GetTileXYAtDirection';

export let GetNeighborTileXY = function (
    hexragon: IHexagonBase,
    srcTileXY: Vec2Type,
    direction: number,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

    return GetTileXYAtDirection(hexragon, srcTileXY, direction, 1, out);
};