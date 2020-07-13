import { IQuadBase, LayoutMode } from './IQuadBase';
import { Vec2Type } from '../IGrid';
import {
    OrthogonalMap,
    IsometricMap,
    DeltaXYToDirectionType
} from './DeltaTileXYToDirection';

export function GetNeighborTileDirection(
    quad: IQuadBase,
    srcTileXY: Vec2Type,
    neighborTileXY: Vec2Type
): number | null {

    let deltaTileXYToDirMap: DeltaXYToDirectionType;
    switch (quad.mode) {
        case LayoutMode.orthogonal:
            deltaTileXYToDirMap = OrthogonalMap;
            break;
        case LayoutMode.isometric:
            deltaTileXYToDirMap = IsometricMap;
            break;
    }

    let deltaTileX: number = neighborTileXY.x - srcTileXY.x;
    let deltaTileY: number = neighborTileXY.y - srcTileXY.y;
    if (deltaTileXYToDirMap.hasOwnProperty(deltaTileX)) {
        let xEntry = deltaTileXYToDirMap[deltaTileX]
        if (xEntry.hasOwnProperty(deltaTileY)) {
            return xEntry[deltaTileY];
        }
    }
    return null;
}