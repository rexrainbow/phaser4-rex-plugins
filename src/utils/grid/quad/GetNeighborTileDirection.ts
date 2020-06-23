import { IQuad, OrientationMode } from './IQuad';
import { PositionType } from '../../types/PositionType';
import {
    OrthogonalMap,
    IsometricMap,
    ReverseDirMapType
} from './DeltaTileXYToDirection';

export function GetNeighborTileDirection(
    quad: IQuad,
    srcTileXY: PositionType,
    neighborTileXY: PositionType
): number | null {

    let deltaTileXYToDirMap: ReverseDirMapType;
    switch (quad.mode) {
        case OrientationMode.orthogonal:
            deltaTileXYToDirMap = OrthogonalMap;
            break;
        case OrientationMode.isometric:
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