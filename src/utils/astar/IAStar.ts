import { SearchMode, SearchModeString } from './types/SearchMode';
export { SearchMode, SearchModeString };

import { PathMode, PathModeString } from './types/PathMode';
export { PathMode, PathModeString };

import { CreateNodeCallbackType } from './types/CreateNodeCallbackType';
export { CreateNodeCallbackType };

import { INodeBase } from './INodeBase';

import { CostValueType } from './types/CostValueType';
export { CostValueType };
import { BLOCKER, INFINITY } from './Const'
export { BLOCKER, INFINITY };

import { INodeManager } from './INodeManager';

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

    getAllNodes(): Map<any, INodeBase>
}