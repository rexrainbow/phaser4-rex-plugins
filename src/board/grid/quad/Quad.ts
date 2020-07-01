import { IGrid, PositionType } from '../IGrid';
import { QuadBase } from './QuadBase';

import { DirectionBetween } from './DirectionBetween';
import { DirectionNormalize } from '../utils/DirectionNormalize';
import { GetDistance } from './GetDistance';
import { GetNeighborTileDirection } from './GetNeighborTileDirection';
import { GetNeighborTileXY } from './GetNeighborTileXY';
import { GetOppositeDirection } from './GetOppositeDirection';
import { GetTileXY } from './GetTileXY';
import { GetTileXYAtDirection } from './GetTileXYAtDirection';
import { GetWorldXY } from './GetWorldXY';
import { MirrorMode, MirrorModeString } from '../IGrid';
import { Mirror } from './Mirror';
import { Offset } from './Offset';
import { RingToTileXYArray } from './RingToTileXYArray';
import { Rotate } from './Rotate';
import { SaveOrigin, RestoreOrigin } from '../utils/SaveOrigin';


export class Quad extends QuadBase implements IGrid {

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

const ALLDIR4 = [0, 1, 2, 3];
const ALLDIR8 = [0, 1, 2, 3, 4, 5, 6, 7];
const HALFDIR4 = [0, 1];
const HALFDIR8 = [0, 1, 4, 5];