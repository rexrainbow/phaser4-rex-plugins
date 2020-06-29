import {
    IGrid,
    PositionType,
    MirrorMode, MirrorModeString
} from '../grid/IGrid';
import { IBoardData } from './boarddata/IBoardData';
import { IChessData, EdgeBlockerType } from '../chess/IChessData';

export type XType = number;
export type YType = number;
export type ZType = number | string;
export type XYType = {
    x: XType,
    y: YType
}
export type XYZType = {
    x: XType,
    y: YType,
    z: ZType
}
export { PositionType };
export interface IChess {
    rexChess?: IChessData;
    x: number,
    y: number,
    destroy?: () => any;
};
export { EdgeBlockerType };

export interface IConfig {
    isBoard?: boolean;
    grid?: IGrid;
    wrap?: boolean;
    inifinity?: boolean;
    width?: number;
    height?: number;

}

// ForEachTileXY
export type ForEachTileXYCallback = (tileXY: XYType, board: ILogicBoard) => void;
export enum ForEachTileXYOrder {
    'x+,y+' = 0,
    'x-,y+' = 1,
    'y+,x+' = 2,
    'y-,x+' = 3
}

// GetTileXYAtDirection
export type DistanceConfig = {
    end?: number,
    start?: number,
    step?: number
};

// Mirror
export { MirrorMode, MirrorModeString };

export interface ILogicBoard {
    isBoard: boolean;
    boardData: IBoardData;
    grid: IGrid;
    wrapMode: boolean;
    infinityMode: boolean;
    width: number | undefined;
    height: number | undefined;

    destroy(): void;
    setWrapMode(
        mode?: boolean
    ): this;

    setInfinityMode(
        mode?: boolean
    ): this;

    setBoardSize(
        width?: number,
        height?: number
    ): this;


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
        order?: number
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
        tileZ?: ZType,
        out?: XYType[]
    ): XYType[];

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
        directions: number | number[] | string | null,
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
        out?: PositionType[]
    ): PositionType[];

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
        out?: PositionType | true
    ): PositionType;

    worldXYSnapToGrid(
        worldX: number,
        worldY: number,
        out: PositionType | true
    ): PositionType;

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