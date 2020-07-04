import {
    ILogicBoard,
    ZType
} from '../board/ILogicBoard';
import {
    AStar,
    CostValueType, BLOCKER
} from '../../utils/astar/Astar';
import { AStarNode } from './astar/AStarNode';

export { CostValueType, BLOCKER };
export type CostNodeType = {
    x: number,
    y: number,
    cost: number
};
export type GetCostCallbackType = (currNode: CostNodeType, prevNode: CostNodeType, pathFinder: IPathFinder) => CostValueType;

export type SearchResult = {
    x: number,
    y: number,
    cost: number
}[];

export interface IConfig {
    board?: ILogicBoard;

    cost?: number;
    costCallback?: GetCostCallbackType;
    costCallbackScope?: any;

    occupiedTest?: boolean;
    blockerTest?: boolean;
    edgeBlockerTest?: boolean;

    pathMode?: number;

    cacheCost?: boolean;

    weight?: number;

    shuffleNeighbors?: boolean;

}

export interface IPathFinder {
    board: ILogicBoard;
    astar: AStar;

    constCost: number;
    costCallback: GetCostCallbackType | null;
    costCallbackScope: any;

    occupiedTest: boolean;
    blockerTest: boolean;
    edgeBlockerTest: boolean;

    searchTileZ: ZType;
    pathMode: number;
    cacheCost: boolean;
    weight: number;
    shuffleNeighbors: boolean;

    BLOCKER: CostValueType;

    getCost(
        currNode: AStarNode,
        prevNode: AStarNode
    ): CostValueType;
}