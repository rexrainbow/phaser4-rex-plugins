export interface IGrid {
    x: number,
    y: number,
    width: number,
    height: number
};

import { PositionType } from '../types/PositionType';

export interface IDirectionBetween {
    (
        grid: IGrid,
        tileA: PositionType,
        tileB: PositionType,
        round?: boolean
    ): number
}

export interface IGetDistance {
    (
        grid: IGrid,
        tileA: PositionType,
        tileB: PositionType,
        roughMode?: boolean
    ): number
}

export interface IGetNeighborTileDirection {
    (
        grid: IGrid,
        srcTileXY: PositionType,
        neighborTileXY: PositionType
    ): number | null
}

export interface IGetNeighborTileXY {
    (
        grid: IGrid,
        srcTileXY: PositionType,
        direction: number,
        out?: PositionType | true
    ): PositionType
}

export interface IGetOppositeDirection {
    (
        grid: IGrid,
        tileX: number | PositionType,
        tileY: number | undefined | null,
        direction: number
    ): number
}

export interface IGetTileXY {
    (
        grid: IGrid,
        worldX: number | PositionType,
        worldY?: number,
        out?: PositionType | true
    ): PositionType
}

export interface IGetTileXAtDirection {
    (
        grid: IGrid,
        srcTileXY: PositionType,
        direction: number,
        distance: number,
        out?: PositionType | true
    ): PositionType
}
export interface IGetWorldXY {
    (
        grid: IGrid,
        tileX: number | PositionType,
        tileY?: number,
        out?: PositionType | true
    ): PositionType
}

export interface IMirror {
    (
        grid: IGrid,
        srcTileXY: PositionType,
        mode: number | string,
        out?: PositionType | true
    ): PositionType
}


export interface IOffset {
    (
        grid: IGrid,
        srcTileXY: PositionType,
        offsetTileX: number,
        offsetTileY: number,
        out?: PositionType | true
    ): PositionType
}

export interface IRingToTileXYArray {
    (
        grid: IGrid,
        centerTileXY: PositionType,
        radius: number,
        out?: PositionType[]
    ): PositionType[]
};

export interface IRotate {
    (
        grid: IGrid,
        srcTileXY: PositionType,
        dir: number,
        out?: PositionType | true
    ): PositionType;
};