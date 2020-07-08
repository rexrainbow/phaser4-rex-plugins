import {
    IPathFinder, IConfig,
    PathMode, PathModeString,
    GetCostCallbackType, CostNodeType, CostValueType, BLOCKER,
    SearchResultType
} from './IPathFinder';
import { IBaseBoard } from '../board/IBaseBoard';
import { IChess, XYZType, XYType, XType, YType } from '../types';
import { IAStar } from '../../utils/astar/IAStar';
import { CreateAStar } from './astar/CreateAStar';
import { GetCost } from './GetCost';
import { FindArea } from './FindArea';
import { FindPath } from './FindPath';
import { GetPath } from './GetPath';
import { TileXYToCost } from './TileXYToCost';

export class PathFinder implements IPathFinder {
    board: IBaseBoard;
    astar: IAStar;

    constCost: number;
    costCallback: GetCostCallbackType | null;
    costCallbackScope: any;
    pathMode: PathMode;
    occupiedTest: boolean;
    blockerTest: boolean;
    edgeBlockerTest: boolean;

    startTileXYZ: XYZType = { x: 0, y: 0, z: 0 };
    cacheCost: boolean;
    weight: number;
    shuffleNeighbors: boolean;

    constructor({
        board = undefined,

        cost = 1,
        costCallback = undefined,
        costCallbackScope = undefined,

        occupiedTest = false,
        blockerTest = false,
        edgeBlockerTest = false,

        pathMode = PathMode['astar'],

        cacheCost = true,

        weight = 10,

        shuffleNeighbors = false
    }: IConfig = {}) {

        this.setBoard(board);

        if (costCallback) {
            this.setCostFunction(costCallback, costCallbackScope);
        } else {
            this.setConstCost(cost);
            this.setCostFunction(null);
        }

        this.setPathMode(pathMode);
        this.setOccupiedTest(occupiedTest);
        this.setBlockerTest(blockerTest);
        this.setEdgeBlockerTest(edgeBlockerTest);

        this.setCacheCostMode(cacheCost);
        this.setWeight(weight);
        this.setShuffleNeighborsMode(shuffleNeighbors);

        this.astar = CreateAStar(this);
    }

    destroy() {

        this.board = null;
        this.astar.destroy();
    }

    setBoard(
        board?: IBaseBoard
    ): this {

        this.board = board;
        return this;
    }

    setConstCost(
        cost: number
    ): this {

        this.constCost = cost;
        return this;
    }

    setCostFunction(
        callback: GetCostCallbackType | null,
        scope?: any
    ): this {

        this.costCallback = callback;
        this.costCallbackScope = scope;
        return this;
    }

    setPathMode(
        mode: PathMode | PathModeString
    ): this {

        if (typeof (mode) === 'string') {
            mode = PathMode[mode];
        }
        this.pathMode = mode;
        return this;
    }

    setOccupiedTest(
        enable: boolean = true
    ): this {

        this.occupiedTest = enable;
        return this;
    }

    setBlockerTest(
        enable: boolean = true
    ): this {

        this.blockerTest = enable;
        return this;
    }

    setEdgeBlockerTest(
        enable: boolean = true
    ): this {

        this.edgeBlockerTest = enable;
        return this;
    }

    setCacheCostMode(
        enable: boolean = true
    ): this {

        this.cacheCost = enable;
        return this;
    }

    setWeight(
        value: number
    ): this {

        this.weight = value;
        return this;
    }

    setShuffleNeighborsMode(
        enable: boolean = true
    ): this {

        this.shuffleNeighbors = enable;
        return this;
    }

    getCost(
        currNode: CostNodeType,
        prevNode: CostNodeType
    ): CostValueType {

        return GetCost(this, currNode, prevNode);
    }

    findArea(
        startChess: IChess,
        movingPoints?: number,
        out: SearchResultType = []
    ): SearchResultType {

        return FindArea(this, startChess, movingPoints, out);
    }

    get BLOCKER(): CostValueType {
        return BLOCKER;
    }

    findPath(
        startChess: IChess,
        endChess: IChess | XYType,
        movingPoints?: number,
        isClosest: boolean = true,
        out: SearchResultType = []
    ): SearchResultType {

        return FindPath(this, startChess, endChess, movingPoints, isClosest, out);
    }

    getPath(
        endChess: IChess | XYZType | XYType,
        out: SearchResultType = []
    ): SearchResultType {

        return GetPath(this, endChess, out);
    }

    tileXYToCost(
        tileX: XType,
        tileY: YType,
        pathCost: boolean = true
    ): CostValueType {

        return TileXYToCost(this, tileX, tileY, pathCost);
    }
}