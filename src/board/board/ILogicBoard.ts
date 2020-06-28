import { IGrid } from '../grid/IGrid';
import { IBoardData } from './boarddata/IBoardData';
import { IChessData } from '../chess/IChessData';
import { PositionType } from '../../utils/types/PositionType';

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
export interface IChess {
    rexChess?: IChessData;
    x?: number,
    y?: number,
    destroy?: () => any;
};

export interface IConfig {
    isBoard?: boolean;
    grid?: IGrid;
    wrap?: boolean;
    inifinity?: boolean;
    width?: number;
    height?: number;

}

export type ForEachTileXYCallback = (tileXY: XYType, board: ILogicBoard) => void;
export enum ForEachTileXYOrder {
    'x+,y+' = 0,
    'x-,y+' = 1,
    'y+,x+' = 2,
    'y-,x+' = 3
}

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

    chessToTileXYZ(
        chess: object
    ): XYZType | object | null;

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

    forEachTileXY(
        callback: ForEachTileXYCallback,
        scope: any,
        order?: number
    ): this;

    getAllChess(
        out?: IChess[]
    ): IChess[];

    getDistance(
        tileA: XYType,
        tileB: XYType,
        roughMode?: boolean
    ): number;

    getOppositeDirection(
        tileX: XType,
        tileY: YType,
        direction: number
    ): number;

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

    isDirectionInCone(
        chessA: IChess | XYType,
        chessB: IChess | XYType,
        face: number,
        cone: number
    ): boolean;

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
        tileZ?: ZType | IChess[],
        out?: IChess[]
    ): IChess[];

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
        out?: PositionType
    ): PositionType;

}