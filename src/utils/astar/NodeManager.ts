import { CreateNodeCallbackType } from './types/CreateNodeCallbackType';
import { INodeBase } from './INodeBase';
import { Stack } from '../../utils/struct/Stack';

export class NodeManager {
    createNodeCallback: CreateNodeCallbackType;
    weight: number;
    nodePool: Stack;
    nodes: Map<any, INodeBase>;
    sn: number;
    closestNode: INodeBase | null;

    constructor(
        createNodeCallback: CreateNodeCallbackType
    ) {
        this.createNodeCallback = createNodeCallback;
        this.nodePool = new Stack();
        this.nodes = new Map();
        this.sn = 0;
    }

    destroy() {

        this.freeAllNodes();
        this.nodePool.destroy();
    }

    getNode(
        key: any,
        createNode: boolean = false
    ): INodeBase | null {

        if (!this.nodes.has(key)) {
            if (!createNode) {
                return null;
            }

            let node: INodeBase = this.nodePool.pop();
            if (node === null) {
                node = this.createNodeCallback();
                node.manager = this;
            }
            node.sn = this.sn;
            node.reset(key);
            this.nodes.set(key, node);
        }
        this.sn++;
        let node = this.nodes.get(key);
        node.sn = this.sn;
        return node;
    }

    freeAllNodes(): this {

        let pool = this.nodePool;
        for (const [key, node] of this.nodes) {
            node.shutdown();
            pool.push(node);
        }
        this.nodes.clear();
        this.sn = 0;
        return this;
    }

    getAllNodes(): Map<any, INodeBase> {

        return this.nodes;
    }
}