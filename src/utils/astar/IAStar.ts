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
    pathMode: PathMode;
    nodeManager: INodeManager;

    destroy(): void;

    setPathMode(
        mode: PathMode | PathModeString
    ): this;

    setWeight(
        weight: number
    ): this;

    search(
        startNodeKey: any,
        endNodeKey: any,
        movingPoints?: number
    ): this;

    getAllNodes(): Map<any, INodeBase>;

    getNode(key: any): INodeBase;

    getClosestNode(): INodeBase;

    getNodePath(
        startNodeKey: any,
        endNodeKey: any
    ): INodeBase[];
}