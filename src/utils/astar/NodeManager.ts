import { PathFinderType, CreateNodeCallbackType } from './IAstar';
import {NodeBase} from './NodeBase';
import { Stack } from '../../utils/struct/Stack';

export class NodeManager<KEY, NODE extends NodeBase>{
    pathFinder: PathFinderType;
    createNodeCallback: CreateNodeCallbackType;
    nodePool: Stack;
    nodes: Map<KEY, NODE>;
    sn: number;

    constructor(
        pathFinder: PathFinderType,
        createNodeCallback: CreateNodeCallbackType
    ) {
        this.pathFinder = pathFinder;
        this.createNodeCallback = createNodeCallback;
        this.nodePool = new Stack();
        this.nodes = new Map();
        this.sn = 0;
    }

    getNode(
        key: KEY,
        createNode: boolean = false
    ): NodeBase | null {

        if (!this.nodes.has(key)) {
            if (!createNode) {
                return null;
            }

            let node: NodeBase = this.nodePool.pop();
            if (node === null) {
                node = this.createNodeCallback(this.pathFinder);
            }
            node.sn = this.sn;
            node.reset(key);
            this.nodes.set(key, node as NODE);
        }
        this.sn++;
        let node = this.nodes.get(key);
        node.sn = this.sn;
        return node;
    }

    freeAllNodes(
    ): this {

        let pool = this.nodePool;
        for (const [key, node] of this.nodes) {
            node.shutdown();
            pool.push(node);
        }
        this.nodes.clear();
        this.sn = 0;
        return this;
    }

    getAllNodes(): Map<KEY, NODE> {

        return this.nodes;
    }
}