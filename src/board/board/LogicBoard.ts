import { BaseBoard } from './BaseBoard';
import { XType, YType, ZType, XYType, XYZType, Vec2Type, IChess } from '../Types';
import { ILogicBoard, IChessData } from './ILogicBoard';

import { AddChess } from './chess/AddChess';
import { AngleBetween } from './worldxy/AngleBetween';
import { AngleSnapToDirection } from './worldxy/AngleSnapToDirection';
import { AngleToward } from './worldxy/AngleToward';
import { AreNeighbors } from './neighbors/AreNeighbors';
import { ChessToTileXYZ } from './tilexy/ChessToTileXYZ';
import { Contains } from './tilexy/Contains';
import { DirectionBetween } from './tilexy/DirectionBetween';
import { FilledRingToTileXYArray } from './ring/FilledRingToTileXYArray';
import { Fit } from './transform/Fit';
import { ForEachTileXY, ForEachTileXYCallback, ForEachTileXYOrder } from './tilexy/ForEachTileXY';
import { GetAllChess } from './chess/GetAllChess';
import { GetChessData } from './chessdata/GetChessData';
import { GetDistance } from './tilexy/GetDistance';
import { GetEmptyTileXYArray } from './empty/GetEmptyTileXYArray';
import { GetGridPoints } from './worldxy/GetGridPoints';
import { GetNeighborChess } from './neighbors/GetNeighborChess';
import { GetNeighborChessDirection } from './neighbors/GetNeighborChessDirection';
import { GetNeighborTileDirection } from './neighbors/GetNeighborTileDirection';
import { GetNeighborTileXY } from './neighbors/GetNeighborTileXY';
import { GetNeighborTileXYAtAngle } from './neighbors/GetNeighborTileXYAtAngle';
import { GetOppositeDirection } from './tilexy/GetOppositeDirection';
import { GetRandomEmptyTileXY } from './empty/GetRandomEmptyTileXY';
import { GetTileXYAtDirection, DistanceConfig } from './tilexy/GetTileXYAtDirection'
import { GetWrapTileXY } from './tilexy/GetWrapTileXY';
import { GridAlign } from './worldxy/GridAlign';
import { HasBlocker } from './blocker/HasBlocker';
import { HasChess } from './chess/HasChess';
import { HasEdgeBlocker } from './blocker/HasEdgeBlocker';
import { IsAngleInCone } from './worldxy/IsAngleInCone';
import { IsDirectionInCone } from './tilexy/IsDirectionInCone';
import { IsOverlappingPoint } from './worldxy/IsOverlappingPoint';
import { LineToTileXYArray } from './shape/LineToTileXYArray';
import { Mirror, MirrorMode, MirrorModeString } from './transform/Mirror';
import { Offset } from './transform/Offset';
import { RemoveAllChess } from './chess/RemoveAllChess';
import { RemoveChess } from './chess/RemoveChess';
import { RingToTileXYArray } from './ring/RingToTileXYArray';
import { Rotate } from './transform/Rotate';
import { SetBoardHeight } from './boarddata/SetBoardHeight';
import { SetBoardWidth } from './boarddata/SetBoardWidth';
import { SetTileZ } from './chess/SetTileZ';
import { ShapeToTileXYArray, ShapeType, ContainsCallbackType } from './shape/ShapeToTileXYArray';
import { SwapChess } from './chess/SwapChess';
import { TileXYArrayToChessArray } from './tilexy/TileXYArrayToChessArray';
import { TileXYToChessArray } from './tilexy/TileXYToChessArray';
import { TileXYZToChess } from './tilexy/TileXYZToChess';
import { TileZToChessArray } from './tilexy/TileZToChessArray';
import { TileXYArrayToWorldXYArray } from './worldxy/TileXYArrayToWorldXYArray';
import { TileXYToWorldXY } from './worldxy/TileXYToWorldXY';
import { WorldXYSnapToGrid } from './worldxy/WorldXYSnapToGrid';
import { WorldXYToChess } from './worldxy/WorldXYToChess';
import { WorldXYToTileXY } from './worldxy/WorldXYToTileXY';

export class LogicBoard extends BaseBoard implements ILogicBoard {

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
    ): XYType | null {

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
        scope?: unknown,
        order: ForEachTileXYOrder = 0
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

    lineToTileXYArray(
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        out: XYType[] = []
    ): XYType[] {

        return LineToTileXYArray(this, startX, startY, endX, endY, out);
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

    setBoardWidth(
        width: number = 0
    ): this {

        SetBoardWidth(this, width);
        return this
    }

    setBoardHeight(
        height: number = 0
    ): this {

        SetBoardHeight(this, height);
        return this;
    }

    setTileZ(
        chess: IChess,
        tileZ: ZType
    ): this {

        SetTileZ(this, chess, tileZ);
        return this;
    }

    shapeToTileXYArray(
        shape: ShapeType,
        containsCallback: ContainsCallbackType,
        out: XYType[] = []
    ): XYType[] {

        return ShapeToTileXYArray(this, shape, containsCallback, out);
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