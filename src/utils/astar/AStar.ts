import {
    PathMode, PathModeString,
    CreateNodeCallbackType
} from './IAStar';

import { INodeBase } from './INodeBase';
import { INodeManager } from './INodeManager';
import { NodeManager } from './NodeManager';
import { Search } from './Search';
import { GetNodePath } from './getnodepath/GetNodePath';

export class AStar {
    pathMode: PathMode;
    nodeManager: INodeManager;

    constructor(
        createNodeCallback: CreateNodeCallbackType
    ) {

        this.nodeManager = new NodeManager(createNodeCallback);
    }

    destroy() {

        this.nodeManager.destroy();
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

    setWeight(
        weight: number
    ): this {

        this.nodeManager.weight = weight;
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

    getNode(key: any): INodeBase {

        return this.nodeManager.getNode(key);
    }

    getClosestNode(): INodeBase | null {

        return this.nodeManager.closestNode;
    }

    getNodePath(
        startNodeKey: any,
        endNodeKey: any
    ): INodeBase[] {

        return GetNodePath(this, startNodeKey, endNodeKey);
    }
}