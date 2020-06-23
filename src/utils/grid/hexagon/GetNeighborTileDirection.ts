import { IHexagon } from './IHexagon';
import { PositionType } from '../../types/PositionType';
import { DeltaTileXYToDirection } from './DeltaTileXYToDirection';
import { GetParity } from './GetParity';

export function GetNeighborTileDirection(
    hexagon: IHexagon,
    srcTileXY: PositionType,
    neighborTileXY: PositionType
): number | null {

    let mode = hexagon.mode;
    let parity = GetParity(mode, srcTileXY.x, srcTileXY.y);
    let deltaTileXYToDirMap = DeltaTileXYToDirection[mode][parity];

    let deltaTileX = neighborTileXY.x - srcTileXY.x;
    let deltaTileY = neighborTileXY.y - srcTileXY.y;
    if (deltaTileXYToDirMap.hasOwnProperty(deltaTileX)) {
        let xEntry = deltaTileXYToDirMap[deltaTileX]
        if (xEntry.hasOwnProperty(deltaTileY)) {
            return xEntry[deltaTileY];
        }
    }
    return null;
}