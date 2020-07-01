import { IQuadBase, LayoutMode } from './IQuadBase';
import { PositionType } from '../IGrid';
import {
    OrthogonalMap,
    IsometricMap,
    DeltaXYToDirectionType
} from './DeltaTileXYToDirection';

export let GetNeighborTileDirection = function (
    quad: IQuadBase,
    srcTileXY: PositionType,
    neighborTileXY: PositionType
) {

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