export enum SearchMode {
    path = 0,
    area = 1
}

export type SearchModeString = 'path' | 'area';

export enum PathMode {
    'all' = 0,
    'astar' = 1,
    'astar-line' = 2,
    'astar-random' = 3
}

export type PathModeString = 'all' | 'astar' | 'astar-line' | 'astar-random';

import { INode } from './INode';
export { INode };
import { NodeBase } from './NodeBase';
export { NodeBase };

export type PathFinderType = object;
export type CreateNodeCallbackType = (pathFinder: PathFinderType) => NodeBase;

export type CostValueType = number | null;
export const BLOCKER = null;

export interface IAStar {
    searchMode: SearchMode;
    pathMode: PathMode;
    nodeManager: INodeManager;

    setSearchMode(
        mode: SearchMode | SearchModeString
    ): this;

    setPathMode(
        mode: PathMode | PathModeString
    ): this;

    search(
        startNodeKey: any,
        endNodeKey: any,
        movingPoints?: number
    ): this;

    getAllNodes(): NodeMapType;
}