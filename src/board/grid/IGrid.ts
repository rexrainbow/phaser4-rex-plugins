import { Vec2Type } from '../Types';
export { Vec2Type };

export interface IGrid {
    x: number,
    y: number,
    width: number,
    height: number

    mode: number;
    directions: number;
    readonly sides: number;
    readonly allDirections: number[];
    readonly halfDirections: number[];

    _savedOriginX: number;
    _savedOriginY: number;

    directionBetween(
        tileA: Vec2Type,
        tileB: Vec2Type,
        round?: boolean
    ): number;

    directionNormalize(
        direction: number
    ): number;

    getDistance(
        tileA: Vec2Type,
        tileB: Vec2Type,
        roughMode?: boolean
    ): number;

    getGridPoints(
        tileX?: number | Vec2Type,
        tileY?: number,
        out?: Vec2Type[] | true
    ): Vec2Type[];

    getNeighborTileDirection(
        srcTileXY: Vec2Type,
        neighborTileXY: Vec2Type
    ): number | null;

    getNeighborTileXY(
        srcTileXY: Vec2Type,
        direction: number,
        out?: Vec2Type | true
    ): Vec2Type;

    getOppositeDirection(
        tileX: number | Vec2Type,
        tileY: number | undefined | null,
        direction: number
    ): number;

    getTileXY(
        worldX: number | Vec2Type,
        worldY?: number,
        out?: Vec2Type | true
    ): Vec2Type;

    getTileXYAtDirection(
        srcTileXY: Vec2Type,
        direction: number,
        distance: number,
        out?: Vec2Type | true
    ): Vec2Type;

    getWorldXY(
        tileX: number | Vec2Type,
        tileY?: number,
        out?: Vec2Type | true
    ): Vec2Type;

    mirror(
        srcTileXY: Vec2Type,
        mode: MirrorMode | MirrorModeString,
        out?: Vec2Type | true
    ): Vec2Type;

    offset(
        srcTileXY: Vec2Type,
        offsetTileX: number,
        offsetTileY: number,
        out?: Vec2Type | true
    ): Vec2Type;

    restoreOrigin(): this;

    ringToTileXYArray(
        centerTileXY: Vec2Type,
        radius: number,
        out?: Vec2Type[]
    ): Vec2Type[];

    rotate(
        srcTileXY: Vec2Type,
        dir: number,
        out?: Vec2Type | true
    ): Vec2Type

    saveOrigin(): this;

    setDirectionMode(
        mode: number
    ): this;
}

export enum MirrorMode {
    x = 1,
    horizontal = 1,
    h = 1,
    y = 2,
    vertical = 2,
    v = 2,
    xy = 3,
}

export type MirrorModeString = 'x' | 'y' | 'xy' | 'vertical' | 'horizontal' | 'v' | 'h';