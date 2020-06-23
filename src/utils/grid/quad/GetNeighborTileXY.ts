import { IQuad } from './IQuad';
import { PositionType } from '../../types/PositionType';
import { GetTileXAtDirection } from './GetTileXYAtDirection';

export function GetNeighborTileXY(
    quad: IQuad,
    srcTileXY: PositionType,
    direction: number,
    out: PositionType | true = {}
): PositionType {

    return GetTileXAtDirection(quad, srcTileXY, direction, 1, out);
}