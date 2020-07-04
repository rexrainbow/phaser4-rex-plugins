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

export type PathFinderType = object;
export type CreateNodeCallbackType = (pathFinder: PathFinderType) => NodeBase;

export type CostValueType = number | null;
export const BLOCKER = null;

import { NodeBase } from './NodeBase';
export { NodeBase };
import { NodeManager } from './NodeManager';
import { Search } from './Search';

export class AStar {
    searchMode: SearchMode;
    pathMode: PathMode;
    nodeManager: NodeManager;

    constructor(
        pathFinder: PathFinderType,
        createNodeCallback: CreateNodeCallbackType
    ) {

        this.nodeManager = new NodeManager(pathFinder, createNodeCallback);
    }

    setSearchMode(
        mode: SearchMode | SearchModeString
    ): this {

        if (typeof (mode) === 'string') {
            mode = SearchMode[mode];
        }
        this.searchMode = mode;
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

    search(
        startNodeKey: any,
        endNodeKey: any,
        movingPoints?: number
    ): this {

        Search(this, startNodeKey, endNodeKey, movingPoints);
        return this;
    }

    getAllNodes(): Map<any, NodeBase> {

        return this.nodeManager.getAllNodes();
    }
}