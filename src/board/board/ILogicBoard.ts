import { IBaseBoard } from './IBaseBoard';
import { XType, YType, ZType, XYType, XYZType, Vec2Type } from '../types';
import { IGrid } from '../grid/IGrid';
import { IChessData, EdgeBlockerType } from './chessdata/IChessData';

export interface IChess {
    rexChess?: IChessData;
    x: number,
    y: number,
    destroy?: () => any;
};
export { IChessData, EdgeBlockerType };

export interface IConfig {
    grid?: IGrid;
    wrap?: boolean;
    inifinity?: boolean;
    width?: number;
    height?: number;
}

// ForEachTileXY
import { ForEachTileXYCallback, ForEachTileXYOrder } from './tilexy/ForEachTileXY';

// GetTileXYAtDirection
import { DistanceConfig } from './tilexy/GetTileXYAtDirection';

// Mirror
import { MirrorMode, MirrorModeString } from './transform/Mirror';
export { MirrorMode, MirrorModeString };

// ShapeToTileXYArray
import { ShapeType, ContainsCallbackType } from './shape/ShapeToTileXYArray';

export interface ILogicBoard extends IBaseBoard {

    addChess(
        chess: IChess,
        tileX: XType,
        tileY: YType,
        tileZ?: ZType,
        align?: boolean
    ): this;

    angleBetween(
        chessA: IChess | XYType,
        chessB: IChess | XYType
    ): number;

    angleSnapToDirection(
        tileXY: XYType,
        angle: number
    ): number;

    angleToward(
        tileXY: XYType,
        direction: number
    ): number;

    areNeighbors(
        chessA: IChess | XYType,
        chessB: IChess | XYType
    ): boolean;

    chessToTileXYZ(
        chess: IChess | XYZType | XYType
    ): XYZType | XYType | null;

    contains(
        tileX: XType,
        tileY: YType,
        tileZ?: ZType
    ): boolean;

    directionBetween(
        chessA: IChess | XYType,
        chessB: IChess | XYType,
        round?: boolean
    ): number | null;

    filledRingToTileXYArray(
        centerTileXY: XYType,
        radius: number,
        nearToFar?: boolean,
        out?: XYType[]
    ): XYType[];

    fit(
        tileXYArray: XYType[]
    ): XYType[];

    forEachTileXY(
        callback: ForEachTileXYCallback,
        scope: any,
        order?: ForEachTileXYOrder
    ): this;

    getAllChess(
        out?: IChess[]
    ): IChess[];

    getChessData(
        chess: IChess
    ): IChessData;

    getDistance(
        tileA: XYType,
        tileB: XYType,
        roughMode?: boolean
    ): number;

    getEmptyTileXYArray(
        tileZ?: ZType | ZType[],
        out?: XYType[]
    ): XYType[];

    getGridPoints(
        tileX?: number | Vec2Type,
        tileY?: number,
        out?: Vec2Type[] | true
    ): Vec2Type[];

    getNeighborChess(
        chess: IChess | XYType,
        directions: number | number[] | string | null,
        neighborTileZ?: ZType | null,
        out?: IChess[]
    ): IChess | IChess[] | null;

    getNeighborChessDirection(
        chess: IChess | XYType,
        neighborChess: IChess | XYType
    ): number;

    getNeighborTileDirection(
        srcTileXY: XYType | null,
        neighborTileXY: XYType | null
    ): number | null;

    getNeighborTileXY(
        srcTileXY: XYType,
        directions?: number | number[] | string | null,
        out?: XYType | true
    ): XYType | XYType[] | null;

    getNeighborTileXYAtAngle(
        srcTileXY: XYType,
        angle: number,
        out?: XYType | true
    ): XYType | null;

    getOppositeDirection(
        tileX: XType,
        tileY: YType,
        direction: number
    ): number;

    getRandomEmptyTileXY(
        tileZ?: ZType,
        out?: XYType | true
    ): XYType | null;

    getTileXYAtDirection(
        chess: IChess | XYType,
        directions: number | number[] | string | null,
        distance: number | number[] | DistanceConfig,
        out?: XYType | XYType[] | true
    ): XYType | XYType[] | null;

    getWrapTileXY(
        tileX: XType,
        tileY: YType,
        out?: XYType | true
    ): XYType;

    gridAlign(
        chess?: IChess,
        tileX?: XType,
        tileY?: YType
    ): this;

    hasBlocker(
        tileX: XType,
        tileY: YType,
        tileZ?: ZType
    ): boolean;

    hasChess(
        chess: IChess
    ): boolean;

    hasEdgeBlocker(
        tileX: XType,
        tileY: YType,
        tileZ: ZType | undefined,
        direction: number
    ): boolean;

    isAngleInCone(
        chessA: IChess | XYType,
        chessB: IChess | XYType,
        face: number,
        cone: number
    ): boolean;

    isDirectionInCone(
        chessA: IChess | XYType,
        chessB: IChess | XYType,
        face: number,
        cone: number
    ): boolean;

    isOverlappingPoint(
        worldX: number,
        worldY: number,
        tileZ?: ZType
    ): boolean;

    lineToTileXYArray(
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        out?: XYType[]
    ): XYType[];

    mirror(
        tileXY: XYType,
        mode: MirrorMode | MirrorModeString,
        originTileXY?: XYType | null,
        out?: XYType | true
    ): XYType;

    offset(
        tileXY: XYType,
        offsetTileX: number,
        offsetTileY: number,
        out?: XYType | true
    ): XYType;

    removeAllChess(
        destroy?: boolean,
        fromBoardRemove?: boolean
    ): this;

    removeChess(
        chess: IChess | null,
        tileX?: XType,
        tileY?: YType,
        tileZ?: ZType,
        destroy?: boolean,
        fromBoardRemove?: boolean
    ): this;

    ringToTileXYArray(
        centerTileXY: XYType,
        radius?: number,
        out?: XYType[]
    ): XYType[];

    rotate(
        tileXY: XYType,
        direction: number,
        originTileXY?: XYType | null,
        out?: XYType | true
    ): XYType;

    setBoardWidth(
        width?: number
    ): this;

    setBoardHeight(
        height?: number
    ): this;

    setTileZ(
        chess: IChess,
        tileZ: ZType
    ): this;

    shapeToTileXYArray(
        shape: ShapeType,
        containsCallback: ContainsCallbackType,
        out?: XYType[]
    ): XYType[];

    swapChess(
        chessA: IChess,
        chessB: IChess,
        align?: boolean
    ): this;

    tileXYArrayToChessArray(
        tileXYArray: XYType[],
        tileZ?: ZType,
        out?: IChess[]
    ): IChess[];

    tileXYArrayToWorldXYArray(
        tileXYArray: XYType[],
        out?: Vec2Type[]
    ): Vec2Type[];

    tileXYToChessArray(
        tileX: XType,
        tileY: YType,
        out?: IChess[]
    ): IChess[];

    tileXYZToChess(
        tileX: XType,
        tileY: YType,
        tileZ: ZType
    ): IChess | null;

    tileZToChessArray(
        tileZ: ZType,
        out?: IChess[]
    ): IChess[];

    tileXYToWorldXY(
        tileX: XType,
        tileY: YType,
        out?: Vec2Type | true
    ): Vec2Type;

    worldXYSnapToGrid(
        worldX: number,
        worldY: number,
        out: Vec2Type | true
    ): Vec2Type;

    worldXYToChess(
        worldX: number,
        worldY: number,
        tileZ?: ZType,
        out?: IChess[]
    ): IChess | IChess[];

    worldXYToTileXY(
        worldX: number,
        worldY: number,
        out?: XYType | true
    ): XYType;
}