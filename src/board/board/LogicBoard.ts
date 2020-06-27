import {
    ILogicBoard,
    IConfig,
    XType, YType, ZType, XYType
} from './ILogicBoard';
import { IGrid } from '../grid/IGrid';
import { IBoardData, IChess, XYZType } from './boarddata/IBoardData';
import { PositionType } from '../../utils/types/PositionType';
import { BoardData } from './boarddata/BoardData';
import { SetBoardWidth } from './boarddata/SetBoardWidth';
import { SetBoardHeight } from './boarddata/SetBoardHeight';

import { AddChess } from './chess/AddChess';
import { ChessToTileXYZ } from './tileposition/ChessToTileXYZ';
import { Contains } from './tileposition/Contains';
import { GetAllChess } from './chess/GetAllChess';
import { GetDistance } from './tileposition/GetDistance';
import { GetOppositeDirection } from './tileposition/GetOppositeDirection';
import { GridAlign } from './worldposition/GridAlign';
import { RemoveAllChess } from './chess/RemoveAllChess';
import { RemoveChess } from './chess/RemoveChess';
import { SwapChess } from './chess/SwapChess';
import { TileXYArrayToChessArray } from './tileposition/TileXYArrayToChessArray';
import { TileXYToChessArray } from './tileposition/TileXYToChessArray';
import { TileXYZToChess } from './tileposition/TileXYZToChess';
import { TileZToChessArray } from './tileposition/TileZToChessArray';
import { TileXYToWorldXY } from './worldposition/TileXYToWorldXY';

export class LogicBoard implements ILogicBoard {
    isBoard: boolean;
    grid: IGrid;
    wrapMode: boolean;
    infinityMode: boolean;
    width: number | undefined;
    height: number | undefined;
    boardData: IBoardData;

    constructor({
        isBoard = true,
        grid = undefined,
        wrap = false,
        inifinity = false,
        width = 0,
        height = 0
    }: IConfig = {}) {

        this.boardData = new BoardData();
        this.isBoard = isBoard;
        this.setGrid(grid);
        this.setWrapMode(wrap);
        this.setInfinityMode(inifinity);
        this.setBoardSize(width, height);
    }

    destroy() {

    }

    setGrid(grid?: IGrid): this {

        this.grid = grid;
        return this;
    }

    setWrapMode(mode: boolean = true): this {

        this.wrapMode = mode;
        return this;
    }

    setInfinityMode(mode: boolean = true): this {

        this.infinityMode = mode;
        return this;
    }

    setBoardSize(width: number = 0, height: number = 0): this {

        SetBoardWidth(this, width);
        SetBoardHeight(this, height);
        return this;
    }

    setBoardWidth(width: number = 0): this {

        SetBoardWidth(this, width);
        return this
    }

    setBoardHeight(height: number = 0): this {

        SetBoardHeight(this, height);
        return this;
    }

    addChess(
        chess: IChess,
        tileX: XType,
        tileY: YType,
        tileZ?: ZType,
        align: boolean = true
    ): this {

        AddChess(this, chess, tileX, tileY, tileZ, align);
        return this;
    }

    chessToTileXYZ(chess: IChess): XYZType | object | null {

        return ChessToTileXYZ(this, chess);
    }

    contains(
        tileX: XType,
        tileY: YType,
        tileZ?: ZType
    ): boolean {


        return Contains(this, tileX, tileY, tileZ);
    }

    getAllChess(
        out: IChess[] = []
    ): IChess[] {

        return GetAllChess(this, out);
    }

    getDistance(
        tileA: XYType,
        tileB: XYType,
        roughMode: boolean = false
    ): number {

        return GetDistance(this, tileA, tileB, roughMode);
    }

    getOppositeDirection(
        tileX: XType,
        tileY: YType,
        direction: number
    ): number {

        return GetOppositeDirection(this, tileX, tileY, direction);
    }

    gridAlign(
        chess?: IChess,
        tileX?: XType,
        tileY?: YType
    ): this {

        GridAlign(this, chess, tileX, tileY);
        return this;
    }

    removeAllChess(
        destroy: boolean = false,
        fromBoardRemove: boolean = false
    ): this {

        RemoveAllChess(this, destroy, fromBoardRemove);
        return this;
    }

    removeChess(
        chess: IChess | null | undefined,
        tileX?: XType,
        tileY?: YType,
        tileZ?: ZType,
        destroy: boolean = false,
        fromBoardRemove: boolean = false
    ): this {

        RemoveChess(this, chess, tileX, tileY, tileZ, destroy, fromBoardRemove);
        return this;
    }

    swapChess(
        chessA: IChess,
        chessB: IChess,
        align: boolean = true
    ): this {

        SwapChess(this, chessA, chessB, align);
        return this;
    }

    tileXYArrayToChessArray(
        tileXYArray: XYType[],
        tileZ?: ZType | IChess[],
        out: IChess[] = []
    ): IChess[] {

        return TileXYArrayToChessArray(this, tileXYArray, tileZ, out);
    }

    tileXYToChessArray(
        tileX: XType,
        tileY: YType,
        out: IChess[] = []
    ): IChess[] {

        return TileXYToChessArray(this, tileX, tileY, out);
    }

    tileXYZToChess(
        tileX: XType,
        tileY: YType,
        tileZ: ZType
    ): IChess | undefined {

        return TileXYZToChess(this, tileX, tileY, tileZ);
    }

    tileZToChessArray(
        tileZ: ZType,
        out: IChess[] = []
    ): IChess[] {

        return TileZToChessArray(this, tileZ, out);
    }

    tileXYToWorldXY(
        tileX: XType,
        tileY: YType,
        out: PositionType = {}
    ): PositionType {

        return TileXYToWorldXY(this, tileX, tileY, out);
    }
}