import { IGrid } from '../IGrid';
import { Quad as Base } from '../../../utils/grid/quad/Quad';
import { PositionType } from '../../../utils/types/PositionType';

import { DirectionBetween } from '../../../utils/grid/quad/DirectionBetween';
import { DirectionNormalize } from '../utils/DirectionNormalize';
import { GetDistance } from '../../../utils/grid/quad/GetDistance';
import { GetNeighborTileDirection } from '../../../utils/grid/quad/GetNeighborTileDirection';
import { GetNeighborTileXY } from '../../../utils/grid/quad/GetNeighborTileXY';
import { GetOppositeDirection } from '../../../utils/grid/quad/GetOppositeDirection';
import { GetTileXY } from '../../../utils/grid/quad/GetTileXY';
import { GetTileXAtDirection } from '../../../utils/grid/quad/GetTileXYAtDirection';
import { GetWorldXY } from '../../../utils/grid/quad/GetWorldXY';
import { MirrorMode, MirrorModeString } from '../IGrid';
import { Mirror } from '../../../utils/grid/quad/Mirror';
import { Offset } from '../../../utils/grid/quad/Offset';
import { RingToTileXYArray } from '../../../utils/grid/quad/RingToTileXYArray';
import { Rotate } from '../../../utils/grid/quad/Rotate';
import { SaveOrigin, RestoreOrigin } from '../utils/SaveOrigin';


export class Quad extends Base implements IGrid {

    _savedOriginX: number;
    _savedOriginY: number;

    get sides() {
        return 4;
    }

    // Direction of neighbors
    get allDirections() {
        return (this.directions === 4) ? ALLDIR4 : ALLDIR8;
    }

    // Board-match
    get halfDirections() {
        return (this.directions === 4) ? HALFDIR4 : HALFDIR8;
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

    GetDistance(
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
        out: PositionType | true = {}
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
        out: PositionType | true = {}
    ): PositionType {

        return GetTileXY(this, worldX, worldY, out);
    }

    getTileXAtDirection(
        srcTileXY: PositionType,
        direction: number,
        distance: number,
        out: PositionType | true = {}
    ): PositionType {

        return GetTileXAtDirection(this, srcTileXY, direction, distance, out);
    }

    getWorldXY(
        tileX: number | PositionType,
        tileY?: number,
        out: PositionType | true = {}
    ): PositionType {

        return GetWorldXY(this, tileX, tileY, out);
    }

    mirror(
        srcTileXY: PositionType,
        mode: MirrorMode | MirrorModeString,
        out: PositionType | true = {}
    ): PositionType {

        return Mirror(this, srcTileXY, mode, out);
    }

    offset(
        srcTileXY: PositionType,
        offsetTileX: number,
        offsetTileY: number,
        out: PositionType | true = {}
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
        out: PositionType | true = {}
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

const ALLDIR4 = [0, 1, 2, 3];
const ALLDIR8 = [0, 1, 2, 3, 4, 5, 6, 7];
const HALFDIR4 = [0, 1];
const HALFDIR8 = [0, 1, 4, 5];