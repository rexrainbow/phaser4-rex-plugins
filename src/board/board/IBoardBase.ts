import {
    IBoardData,
    IChess, XType, YType, ZType
} from './boarddata/IBoardData';
import { IGrid } from '../grid/IGrid';

export interface IConfig {
    grid?: IGrid;
    wrap?: boolean;
    inifinity?: boolean;
    width?: number;
    height?: number;
}

export interface IBoardBase {
    boardData: IBoardData;
    grid: IGrid;
    wrapMode: boolean;
    infinityMode: boolean;
    width: number | undefined;
    height: number | undefined;
    _isBoard: boolean; // Set to false for miniboard

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

    removeChess(
        chess: IChess | null,
        tileX?: XType,
        tileY?: YType,
        tileZ?: ZType,
        destroy?: boolean,
        fromBoardRemove?: boolean
    ): this;

}