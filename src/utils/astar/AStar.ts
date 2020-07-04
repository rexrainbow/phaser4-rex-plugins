import {
    SearchMode, SearchModeString,
    PathMode, PathModeString,
    CreateNodeCallbackType
} from './IAStar';

import { INodeBase } from './INodeBase';
import { INodeManager } from './INodeManager';
import { NodeManager } from './NodeManager';
import { Search } from './Search';

export class AStar {
    searchMode: SearchMode;
    pathMode: PathMode;
    nodeManager: INodeManager;

    constructor(
        pathFinder: object,
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

    getAllNodes(): Map<any, INodeBase> {

        return this.nodeManager.getAllNodes();
    }
}