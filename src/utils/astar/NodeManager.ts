import { INode } from './INode';
import {NodeBase} from './NodeBase';

export class NodeManager {
    nodes: Map<any, INode>;
    sn: number;

    constructor() {
        this.nodes = new Map();
        this.sn = 0;
    }

    getNode(
        key: any,
        createNewNode: boolean = false
    ): INode | null {

        if (!this.nodes.has(key)) {
            if (!createNewNode) {
                return null;
            }

        }
        this.sn++;
        let node = this.nodes.get(key);
        node.sn = this.sn;
        return node;
    }

    freeAllNodes() {
        this.nodes.clear();
        this.sn = 0;
        return this;
    }

    getAllNodes() {
        return this.nodes;
    }
}