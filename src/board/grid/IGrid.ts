import {
    IGrid as Base,
    PositionType
} from '../../utils/grid/IGrid';

export { PositionType };
export interface IGrid extends Base {

    directions: number;
    readonly sides: number;
    readonly allDirections: number[];
    readonly halfDirections: number[];

    _savedOriginX: number;
    _savedOriginY: number;

    directionBetween(
        tileA: PositionType,
        tileB: PositionType,
        round?: boolean
    ): number

    directionNormalize(
        direction: number
    ): number

    getDistance(
        tileA: PositionType,
        tileB: PositionType,
        roughMode?: boolean
    ): number

    getNeighborTileDirection(
        srcTileXY: PositionType,
        neighborTileXY: PositionType
    ): number | null

    getNeighborTileXY(
        srcTileXY: PositionType,
        direction: number,
        out?: PositionType | true
    ): PositionType

    getOppositeDirection(
        tileX: number | PositionType,
        tileY: number | undefined | null,
        direction: number
    ): number

    getTileXY(
        worldX: number | PositionType,
        worldY?: number,
        out?: PositionType | true
    ): PositionType

    getTileXYAtDirection(
        srcTileXY: PositionType,
        direction: number,
        distance: number,
        out?: PositionType | true
    ): PositionType

    getWorldXY(
        tileX: number | PositionType,
        tileY?: number,
        out?: PositionType | true
    ): PositionType

    mirror(
        srcTileXY: PositionType,
        mode: number | string,
        out?: PositionType | true
    ): PositionType

    offset(
        srcTileXY: PositionType,
        offsetTileX: number,
        offsetTileY: number,
        out?: PositionType | true
    ): PositionType

    restoreOrigin(): this;

    ringToTileXYArray(
        centerTileXY: PositionType,
        radius: number,
        out?: PositionType[]
    ): PositionType[]

    rotate(
        srcTileXY: PositionType,
        dir: number,
        out?: PositionType | true
    ): PositionType

    saveOrigin(): this;
}

import { MirrorMode, MirrorModeString } from '../../utils/grid/MirrorMode';
export { MirrorMode, MirrorModeString };