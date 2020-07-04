import { ILogicBoard } from '../board/ILogicBoard';
import {
    IAStar,
    CostValueType, BLOCKER
} from '../../utils/astar/IAstar';
import { AStarNode } from './astar/AStarNode';

export { CostValueType, BLOCKER };
export type GetCostCallbackType = (currNode: AStarNode, prevNode: AStarNode, pathFinder: IPathFinder) => CostValueType;

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
    astar: IAStar;

    constCost: number;
    costCallback: GetCostCallbackType | null;
    costCallbackScope: any;

    occupiedTest: boolean;
    blockerTest: boolean;
    edgeBlockerTest: boolean;

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