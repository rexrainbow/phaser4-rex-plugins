import { IHexagon } from './IHexagon';
import { PositionType } from '../../types/PositionType';
import { GetTileXAtDirection } from './GetTileXYAtDirection';

export function GetNeighborTileXY(
    hexragon: IHexagon,
    srcTileXY: PositionType,
    direction: number,
    out: PositionType | true = {}
): PositionType {

    return GetTileXAtDirection(hexragon, srcTileXY, direction, 1, out);
};