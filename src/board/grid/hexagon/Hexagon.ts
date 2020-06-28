import { IGrid, PositionType } from '../IGrid';
import { Hexagon as Base } from '../../../utils/grid/hexagon/Hexagon';

import { DirectionBetween } from '../../../utils/grid/hexagon/DirectionBetween';
import { DirectionNormalize } from '../utils/DirectionNormalize';
import { GetDistance } from '../../../utils/grid/hexagon/GetDistance';
import { GetNeighborTileDirection } from '../../../utils/grid/hexagon/GetNeighborTileDirection';
import { GetNeighborTileXY } from '../../../utils/grid/hexagon/GetNeighborTileXY';
import { GetOppositeDirection } from '../../../utils/grid/hexagon/GetOppositeDirection';
import { GetTileXY } from '../../../utils/grid/hexagon/GetTileXY';
import { GetTileXYAtDirection } from '../../../utils/grid/hexagon/GetTileXYAtDirection';
import { GetWorldXY } from '../../../utils/grid/hexagon/GetWorldXY';
import { MirrorMode, MirrorModeString } from '../IGrid';
import { Mirror } from '../../../utils/grid/hexagon/Mirror';
import { Offset } from '../../../utils/grid/hexagon/Offset';
import { RingToTileXYArray } from '../../../utils/grid/hexagon/RingToTileXYArray';
import { Rotate } from '../../../utils/grid/hexagon/Rotate';
import { SaveOrigin, RestoreOrigin } from '../utils/SaveOrigin';

export class Hexagon extends Base implements IGrid {

    _savedOriginX: number;
    _savedOriginY: number;

    get sides() {
        return 6;
    }

    // Direction of neighbors
    get allDirections() {
        return ALLDIR;
    }

    // Board-match
    get halfDirections() {
        return HALFDIR;
    }

    directionBetween(
        tileA: PositionType,
        tileB: PositionType,
        round: boolean = true
    ): number {

        return DirectionBetween(this, tileA, tileB, round);
    }

    directionNormalize(
        direction: number
    ): number {

        return DirectionNormalize(this, direction);
    }

    getDistance(
        tileA: PositionType,
        tileB: PositionType,
        roughMode: boolean = false
    ): number {

        return GetDistance(this, tileA, tileB, roughMode);
    }

    getNeighborTileDirection(
        srcTileXY: PositionType,
        neighborTileXY: PositionType
    ): number | null {

        return GetNeighborTileDirection(this, srcTileXY, neighborTileXY);
    }

    getNeighborTileXY(
        srcTileXY: PositionType,
        direction: number,
        out: PositionType | true = { x: 0, y: 0 }
    ): PositionType {

        return GetNeighborTileXY(this, srcTileXY, direction, out);
    }

    getOppositeDirection(
        tileX: number | PositionType,
        tileY: number | undefined | null,
        direction: number
    ): number {

        return GetOppositeDirection(this, tileX, tileY, direction);
    }

    getTileXY(
        worldX: number | PositionType,
        worldY?: number,
        out: PositionType | true = { x: 0, y: 0 }
    ): PositionType {

        return GetTileXY(this, worldX, worldY, out);
    }

    getTileXYAtDirection(
        srcTileXY: PositionType,
        direction: number,
        distance: number,
        out: PositionType | true = { x: 0, y: 0 }
    ): PositionType {

        return GetTileXYAtDirection(this, srcTileXY, direction, distance, out);
    }

    getWorldXY(
        tileX: number | PositionType,
        tileY?: number,
        out: PositionType | true = { x: 0, y: 0 }
    ): PositionType {

        return GetWorldXY(this, tileX, tileY, out);
    }

    mirror(
        srcTileXY: PositionType,
        mode: MirrorMode | MirrorModeString,
        out: PositionType | true = { x: 0, y: 0 }
    ): PositionType {

        return Mirror(this, srcTileXY, mode, out);
    }

    offset(
        srcTileXY: PositionType,
        offsetTileX: number,
        offsetTileY: number,
        out: PositionType | true = { x: 0, y: 0 }
    ): PositionType {

        return Offset(this, srcTileXY, offsetTileX, offsetTileY, out);
    }

    ringToTileXYArray(
        centerTileXY: PositionType,
        radius: number,
        out: PositionType[] = []
    ): PositionType[] {

        return RingToTileXYArray(this, centerTileXY, radius, out);
    }

    rotate(srcTileXY: PositionType,
        dir: number,
        out: PositionType | true = { x: 0, y: 0 }
    ): PositionType {

        return Rotate(this, srcTileXY, dir, out);
    }

    saveOrigin() {

        SaveOrigin(this);
        return this;
    }

    restoreOrigin() {

        RestoreOrigin(this);
        return this
    }
}

const ALLDIR = [0, 1, 2, 3, 4, 5];
const HALFDIR = [0, 1, 2];