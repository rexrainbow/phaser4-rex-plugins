import {
    ILogicBoard,
    IConfig,
    XType, YType, ZType, XYType, Vec2Type,
    IChessData,
    ForEachTileXYCallback,
    DistanceConfig,
    MirrorMode, MirrorModeString
} from './ILogicBoard';
import { IGrid } from '../grid/IGrid';
import { IBoardData, IChess, XYZType } from './boarddata/IBoardData';

import { BoardData } from './boarddata/BoardData';
import { SetBoardWidth } from './boarddata/SetBoardWidth';
import { SetBoardHeight } from './boarddata/SetBoardHeight';

import { AddChess } from './chess/AddChess';
import { AngleBetween } from './worldposition/AngleBetween';
import { AngleSnapToDirection } from './worldposition/AngleSnapToDirection';
import { AngleToward } from './worldposition/AngleToward';
import { AreNeighbors } from './neighbors/AreNeighbors';
import { ChessToTileXYZ } from './tileposition/ChessToTileXYZ';
import { Contains } from './tileposition/Contains';
import { DirectionBetween } from './tileposition/DirectionBetween';
import { FilledRingToTileXYArray } from './ring/FilledRingToTileXYArray';
import { Fit } from './transform/Fit';
import { ForEachTileXY } from './tileposition/ForEachTileXY';
import { GetAllChess } from './chess/GetAllChess';
import { GetChessData } from '../chess/GetChessData';
import { GetDistance } from './tileposition/GetDistance';
import { GetEmptyTileXYArray } from './empty/GetEmptyTileXYArray';
import { GetGridPoints } from './worldposition/GetGridPoints';
import { GetNeighborChess } from './neighbors/GetNeighborChess';
import { GetNeighborChessDirection } from './neighbors/GetNeighborChessDirection';
import { GetNeighborTileDirection } from './neighbors/GetNeighborTileDirection';
import { GetNeighborTileXY } from './neighbors/GetNeighborTileXY';
import { GetNeighborTileXYAtAngle } from './neighbors/GetNeighborTileXYAtAngle';
import { GetOppositeDirection } from './tileposition/GetOppositeDirection';
import { GetRandomEmptyTileXY } from './empty/GetRandomEmptyTileXY';
import { GetTileXYAtDirection } from './neighbors/GetTileXYAtDirection'
import { GetWrapTileXY } from './tileposition/GetWrapTileXY';
import { GridAlign } from './worldposition/GridAlign';
import { HasBlocker } from './blocker/HasBlocker';
import { HasChess } from './chess/HasChess';
import { HasEdgeBlocker } from './blocker/HasEdgeBlocker';
import { IsAngleInCone } from './worldposition/IsAngleInCone';
import { IsDirectionInCone } from './tileposition/IsDirectionInCone';
import { IsOverlappingPoint } from './worldposition/IsOverlappingPoint';
import { Mirror } from './transform/Mirror';
import { Offset } from './transform/Offset';
import { RemoveAllChess } from './chess/RemoveAllChess';
import { RemoveChess } from './chess/RemoveChess';
import { RingToTileXYArray } from './ring/RingToTileXYArray';
import { Rotate } from './transform/Rotate';
import { SwapChess } from './chess/SwapChess';
import { TileXYArrayToChessArray } from './tileposition/TileXYArrayToChessArray';
import { TileXYToChessArray } from './tileposition/TileXYToChessArray';
import { TileXYZToChess } from './tileposition/TileXYZToChess';
import { TileZToChessArray } from './tileposition/TileZToChessArray';
import { TileXYArrayToWorldXYArray } from './worldposition/TileXYArrayToWorldXYArray';
import { TileXYToWorldXY } from './worldposition/TileXYToWorldXY';
import { WorldXYSnapToGrid } from './worldposition/WorldXYSnapToGrid';
import { WorldXYToChess } from './worldposition/WorldXYToChess';
import { WorldXYToTileXY } from './worldposition/WorldXYToTileXY';

export class LogicBoard implements ILogicBoard {

    grid: IGrid;
    wrapMode: boolean;
    infinityMode: boolean;
    width: number | undefined;
    height: number | undefined;
    boardData: IBoardData;
    _isBoard: boolean;

    constructor({
        grid = undefined,
        wrap = false,
        inifinity = false,
        width = 0,
        height = 0
    }: IConfig = {}) {

        this.boardData = new BoardData();
        this._isBoard = true;
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

    angleBetween(
        chessA: IChess | XYType,
        chessB: IChess | XYType
    ): number {

        return AngleBetween(this, chessA, chessB);
    }

    angleSnapToDirection(
        tileXY: XYType,
        angle: number
    ): number {

        return AngleSnapToDirection(this, tileXY, angle);
    }

    angleToward(
        tileXY: XYType,
        direction: number
    ): number {

        return AngleToward(this, tileXY, direction);
    }

    areNeighbors(
        chessA: IChess | XYType,
        chessB: IChess | XYType
    ): boolean {

        return AreNeighbors(this, chessA, chessB);
    }

    chessToTileXYZ(
        chess: IChess | XYZType | XYType
    ): XYZType | any | null {

        return ChessToTileXYZ(this, chess);
    }

    contains(
        tileX: XType,
        tileY: YType,
        tileZ?: ZType
    ): boolean {


        return Contains(this, tileX, tileY, tileZ);
    }

    directionBetween(
        chessA: IChess | XYType,
        chessB: IChess | XYType,
        round: boolean = true
    ): number | null {

        return DirectionBetween(this, chessA, chessB, round);
    }

    filledRingToTileXYArray(
        centerTileXY: XYType,
        radius: number,
        nearToFar: boolean = true,
        out: XYType[] = []
    ): XYType[] {

        return FilledRingToTileXYArray(this, centerTileXY, radius, nearToFar, out);
    }

    fit(
        tileXYArray: XYType[]
    ): XYType[] {

        return Fit(this, tileXYArray);
    }

    forEachTileXY(
        callback: ForEachTileXYCallback,
        scope?: any,
        order: number = 0
    ): this {

        ForEachTileXY(this, callback, scope, order);
        return this;
    }

    getAllChess(
        out: IChess[] = []
    ): IChess[] {

        return GetAllChess(this, out);
    }

    getChessData(
        chess: IChess
    ): IChessData {

        return GetChessData(chess);
    }

    getDistance(
        tileA: XYType,
        tileB: XYType,
        roughMode: boolean = false
    ): number {

        return GetDistance(this, tileA, tileB, roughMode);
    }

    getEmptyTileXYArray(
        tileZ: ZType | ZType[] = 0,
        out: XYType[] = []
    ): XYType[] {

        return GetEmptyTileXYArray(this, tileZ, out);
    }

    getGridPoints(
        tileX?: number | Vec2Type,
        tileY?: number,
        out?: Vec2Type[] | true
    ): Vec2Type[] {

        return GetGridPoints(this, tileX, tileY, out);
    }

    getNeighborChess(
        chess: IChess | XYType,
        directions: number | number[] | string | null,
        neighborTileZ?: ZType | null,
        out?: IChess[]
    ): IChess | IChess[] | null {

        return GetNeighborChess(this, chess, directions, neighborTileZ, out);
    }

    getNeighborChessDirection(
        chess: IChess | XYType,
        neighborChess: IChess | XYType
    ): number {

        return GetNeighborChessDirection(this, chess, neighborChess);
    }

    getNeighborTileDirection(
        srcTileXY: XYType | null,
        neighborTileXY: XYType | null
    ): number | null {

        return GetNeighborTileDirection(this, srcTileXY, neighborTileXY);
    }

    getNeighborTileXY(
        srcTileXY: XYType,
        directions: number | number[] | string | null = null,
        out: XYType | true = { x: 0, y: 0 }
    ): XYType | XYType[] | null {

        return GetNeighborTileXY(this, srcTileXY, directions, out);
    }

    getNeighborTileXYAtAngle(
        srcTileXY: XYType,
        angle: number,
        out: XYType | true = { x: 0, y: 0 }
    ): XYType | null {

        return GetNeighborTileXYAtAngle(this, srcTileXY, angle, out);
    }

    getOppositeDirection(
        tileX: XType,
        tileY: YType,
        direction: number
    ): number {

        return GetOppositeDirection(this, tileX, tileY, direction);
    }

    getRandomEmptyTileXY(
        tileZ: ZType = 0,
        out: XYType | true = { x: 0, y: 0 }
    ): XYType | null {

        return GetRandomEmptyTileXY(this, tileZ, out);
    }

    getTileXYAtDirection(
        chess: IChess | XYType,
        directions: number | number[] | string | null,
        distance: number | number[] | DistanceConfig,
        out?: XYType | XYType[] | true
    ): XYType | XYType[] | null {

        return GetTileXYAtDirection(this, chess, directions, distance, out);
    }

    getWrapTileXY(
        tileX: XType,
        tileY: YType,
        out: XYType | true = { x: 0, y: 0 }
    ): XYType {

        return GetWrapTileXY(this, tileX, tileY, out)
    }

    gridAlign(
        chess?: IChess,
        tileX?: XType,
        tileY?: YType
    ): this {

        GridAlign(this, chess, tileX, tileY);
        return this;
    }

    hasBlocker(
        tileX: XType,
        tileY: YType,
        tileZ?: ZType
    ): boolean {

        return HasBlocker(this, tileX, tileY, tileZ);
    }

    hasChess(
        chess: IChess
    ): boolean {

        return HasChess(this, chess);
    }

    hasEdgeBlocker(
        tileX: XType,
        tileY: YType,
        tileZ: ZType | undefined,
        direction: number
    ): boolean {

        return HasEdgeBlocker(this, tileX, tileY, tileZ, direction);
    }

    isAngleInCone(
        chessA: IChess | XYType,
        chessB: IChess | XYType,
        face: number,
        cone: number
    ): boolean {

        return IsAngleInCone(this, chessA, chessB, face, cone);
    }

    isDirectionInCone(
        chessA: IChess | XYType,
        chessB: IChess | XYType,
        face: number,
        cone: number
    ): boolean {

        return IsDirectionInCone(this, chessA, chessB, face, cone);
    }

    isOverlappingPoint(
        worldX: number,
        worldY: number,
        tileZ?: ZType
    ): boolean {

        return IsOverlappingPoint(this, worldX, worldY, tileZ);
    }

    mirror(
        tileXY: XYType,
        mode: MirrorMode | MirrorModeString,
        originTileXY: XYType | null = null,
        out: XYType | true = { x: 0, y: 0 }
    ): XYType {

        return Mirror(this, tileXY, mode, originTileXY, out);
    }

    offset(
        tileXY: XYType,
        offsetTileX: number,
        offsetTileY: number,
        out?: XYType | true
    ): XYType {

        return Offset(this, tileXY, offsetTileX, offsetTileY, out);
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

    ringToTileXYArray(
        centerTileXY: XYType,
        radius: number = 1,
        out: XYType[] = []
    ): XYType[] {

        return RingToTileXYArray(this, centerTileXY, radius, out);
    }

    rotate(
        tileXY: XYType,
        direction: number,
        originTileXY: XYType | null = null,
        out: XYType | true = { x: 0, y: 0 }
    ): XYType {

        return Rotate(this, tileXY, direction, originTileXY, out);
    }

    setBoardWidth(width: number = 0): this {

        SetBoardWidth(this, width);
        return this
    }

    setBoardHeight(height: number = 0): this {

        SetBoardHeight(this, height);
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
        tileZ?: ZType,
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

    tileXYArrayToWorldXYArray(
        tileXYArray: XYType[],
        out: Vec2Type[] = []
    ): Vec2Type[] {

        return TileXYArrayToWorldXYArray(this, tileXYArray, out);
    }

    tileXYToWorldXY(
        tileX: XType,
        tileY: YType,
        out: Vec2Type | true = { x: 0, y: 0 }
    ): Vec2Type {

        return TileXYToWorldXY(this, tileX, tileY, out);
    }

    worldXYSnapToGrid(
        worldX: number,
        worldY: number,
        out: Vec2Type | true = { x: 0, y: 0 }
    ): Vec2Type {

        return WorldXYSnapToGrid(this, worldX, worldY, out);
    }

    worldXYToChess(
        worldX: number,
        worldY: number,
        tileZ?: ZType,
        out?: IChess[]
    ): IChess | IChess[] {

        return WorldXYToChess(this, worldX, worldY, tileZ, out);
    }

    worldXYToTileXY(
        worldX: number,
        worldY: number,
        out?: XYType | true
    ): XYType {

        return WorldXYToTileXY(this, worldX, worldY, out);
    }
}