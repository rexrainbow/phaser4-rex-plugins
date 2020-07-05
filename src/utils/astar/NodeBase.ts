import { PathMode } from './types/PathMode';
import { CostValueType } from './types/CostValueType';
import { BLOCKER } from './Const';
import { INodeBase } from './INodeBase';
import { INodeManager } from './INodeManager';

export abstract class NodeBase {
    manager: INodeManager;

    f: number;
    g: number;
    h: number;
    closerH: number;

    visited: boolean;
    closed: boolean;

    prevNodes: INodeBase[];
    key: any; // string, number or an object
    sn: number; // For sorting by created order

    constructor() {

        this.prevNodes = [];
    }

    shutdown(): void {
        this.key = undefined;
        this.prevNodes.length = 0;
    }

    destroy(): void {
        this.shutdown();
    }

    // Override
    reset(key: any): void {
        this.key = key;
        this.f = 0;
        this.g = 0; // path cost
        this.h = undefined;
        this.closerH = undefined;
        this.visited = false;
        this.closed = false;
    }

    heuristic(
        endNode: INodeBase,
        astarMode: PathMode | null,
        baseNode?: INodeBase,
    ): number {

        if (astarMode === null) {
            return 0;
        }

        let h: number;
        let dist = this.distanceTo(endNode) * this.manager.weight;

        switch (astarMode) {
            case PathMode.astar:
                h = dist;
                break;
            case PathMode['astar-line']:
                if (baseNode !== undefined) {
                    let deltaAngle = endNode.angleTo(baseNode) - this.angleTo(baseNode);
                    h = dist + Math.abs(deltaAngle);
                } else {
                    h = dist;
                }
            case PathMode['astar-random']:
                h = dist + Math.random();
                break;
            default:
                h = dist;
                break;
        }
        return h;
    }

    // Override
    getNextNodes(): INodeBase[] {

        return [];
    }

    // Override
    getCost(
        preNode: INodeBase
    ): CostValueType {

        return BLOCKER;
    }

    // Override
    distanceTo(
        node: INodeBase
    ): number {

        return 0;
    }

    // Override
    angleTo(
        node: INodeBase
    ): number {

        return 0;
    }

    // Override
    logicDirTo(
        node: INodeBase
    ): number {

        return 0;
    }

    getNode(
        key: any,
        createNode: boolean = false
    ): INodeBase {

        return this.manager.getNode(key, createNode);
    }
}