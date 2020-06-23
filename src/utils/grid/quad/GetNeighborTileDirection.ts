import { IQuad, LayoutMode } from './IQuad';
import { PositionType } from '../../types/PositionType';
import {
    OrthogonalMap,
    IsometricMap,
    DeltaXYToDirectionType
} from './DeltaTileXYToDirection';

export function GetNeighborTileDirection(
    quad: IQuad,
    srcTileXY: PositionType,
    neighborTileXY: PositionType
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