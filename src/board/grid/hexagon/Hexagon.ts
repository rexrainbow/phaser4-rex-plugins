import { IGrid, Vec2Type } from '../IGrid';
import { HexagonBase } from './HexagonBase';

import { DirectionBetween } from './DirectionBetween';
import { DirectionNormalize } from '../utils/DirectionNormalize';
import { GetDistance } from './GetDistance';
import { GetGridPoints } from './GetGridPoints';
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

export class Hexagon extends HexagonBase implements IGrid {

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
        tileA: Vec2Type,
        tileB: Vec2Type,
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
        tileA: Vec2Type,
        tileB: Vec2Type,
        roughMode: boolean = false
    ): number {

        return GetDistance(this, tileA, tileB, roughMode);
    }

    getGridPoints(
        tileX: number | Vec2Type = 0,
        tileY: number = 0,
        out: Vec2Type[] | true = []
    ): Vec2Type[] {

        return GetGridPoints(this, tileX, tileY, out);
    }

    getNeighborTileDirection(
        srcTileXY: Vec2Type,
        neighborTileXY: Vec2Type
    ): number | null {

        return GetNeighborTileDirection(this, srcTileXY, neighborTileXY);
    }

    getNeighborTileXY(
        srcTileXY: Vec2Type,
        direction: number,
        out: Vec2Type | true = { x: 0, y: 0 }
    ): Vec2Type {

        return GetNeighborTileXY(this, srcTileXY, direction, out);
    }

    getOppositeDirection(
        tileX: number | Vec2Type,
        tileY: number | undefined | null,
        direction: number
    ): number {

        return GetOppositeDirection(this, tileX, tileY, direction);
    }

    getTileXY(
        worldX: number | Vec2Type,
        worldY?: number,
        out: Vec2Type | true = { x: 0, y: 0 }
    ): Vec2Type {

        return GetTileXY(this, worldX, worldY, out);
    }

    getTileXYAtDirection(
        srcTileXY: Vec2Type,
        direction: number,
        distance: number,
        out: Vec2Type | true = { x: 0, y: 0 }
    ): Vec2Type {

        return GetTileXYAtDirection(this, srcTileXY, direction, distance, out);
    }

    getWorldXY(
        tileX: number | Vec2Type,
        tileY?: number,
        out: Vec2Type | true = { x: 0, y: 0 }
    ): Vec2Type {

        return GetWorldXY(this, tileX, tileY, out);
    }

    mirror(
        srcTileXY: Vec2Type,
        mode: MirrorMode | MirrorModeString,
        out: Vec2Type | true = { x: 0, y: 0 }
    ): Vec2Type {

        return Mirror(this, srcTileXY, mode, out);
    }

    offset(
        srcTileXY: Vec2Type,
        offsetTileX: number,
        offsetTileY: number,
        out: Vec2Type | true = { x: 0, y: 0 }
    ): Vec2Type {

        return Offset(this, srcTileXY, offsetTileX, offsetTileY, out);
    }

    ringToTileXYArray(
        centerTileXY: Vec2Type,
        radius: number,
        out: Vec2Type[] = []
    ): Vec2Type[] {

        return RingToTileXYArray(this, centerTileXY, radius, out);
    }

    rotate(srcTileXY: Vec2Type,
        dir: number,
        out: Vec2Type | true = { x: 0, y: 0 }
    ): Vec2Type {

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