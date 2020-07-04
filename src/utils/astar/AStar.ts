import {
    IAStar,
    PathFinderType, CreateNodeCallbackType, SearchMode, SearchModeString,
    PathMode, PathModeString
} from './IAstar';
import { NodeBase } from './NodeBase';
import { NodeManager } from './NodeManager';
import { Search } from './Search';

export class AStar<K, V extends NodeBase> implements IAStar {
    searchMode: SearchMode;
    pathMode: PathMode;
    nodeManager: NodeManager<K, V>;

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

    getAllNodes(): Map<K, V> {

        return this.nodeManager.getAllNodes();
    }
}