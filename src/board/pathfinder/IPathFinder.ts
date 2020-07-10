import { XYZType } from '../types';
import { IBaseBoard } from '../board/IBaseBoard';
import {
    IAStar,
    PathMode, PathModeString,
    CostValueType, BLOCKER
} from '../../utils/astar/IAStar';

export { PathMode, PathModeString };
export { CostValueType, BLOCKER };
export type CostNodeType = {
    x: number,
    y: number,
    cost: number
};
export type GetCostCallbackType = (currNode: CostNodeType, prevNode: CostNodeType, pathFinder: IPathFinder) => CostValueType;

export type SearchResultType = {
    x: number,
    y: number,
    cost: number
}[];

export interface IConfig {
    board?: IBaseBoard;

    cost?: number;
    costCallback?: GetCostCallbackType;
    costCallbackScope?: unknown;

    occupiedTest?: boolean;
    blockerTest?: boolean;
    edgeBlockerTest?: boolean;

    pathMode?: PathMode | PathModeString;

    cacheCost?: boolean;

    weight?: number;

    shuffleNeighbors?: boolean;

}

export interface IPathFinder {
    board: IBaseBoard;
    astar: IAStar;

    constCost: number;
    costCallback: GetCostCallbackType | null;
    costCallbackScope: unknown;
    pathMode: PathMode;
    occupiedTest: boolean;
    blockerTest: boolean;
    edgeBlockerTest: boolean;

    startTileXYZ: XYZType;
    cacheCost: boolean;
    weight: number;
    shuffleNeighbors: boolean;

    BLOCKER: CostValueType;

    getCost(
        currNode: CostNodeType,
        prevNode: CostNodeType
    ): CostValueType;
}