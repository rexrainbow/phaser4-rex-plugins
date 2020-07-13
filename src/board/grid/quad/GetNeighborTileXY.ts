import { IQuadBase } from './IQuadBase';
import { Vec2Type } from '../IGrid';
import { GetTileXYAtDirection } from './GetTileXYAtDirection';

export function GetNeighborTileXY(
    quad: IQuadBase,
    srcTileXY: Vec2Type,
    direction: number,
    out: Vec2Type | true = { x: 0, y: 0 }
): Vec2Type {

    return GetTileXYAtDirection(quad, srcTileXY, direction, 1, out);
}