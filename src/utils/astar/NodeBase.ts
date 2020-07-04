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

    preNodes: INodeBase[];
    key: any; // string, number or an object
    sn: number; // For sorting by created order

    constructor() {

        this.preNodes = [];
    }

    shutdown(): void {
        this.key = undefined;
        this.preNodes.length = 0;
    }

    destroy(): void {
        this.shutdown();
    }

    // Override
    reset(key: any): void {
        this.key = key;
        this.f = 0;
        this.g = 0; // path cost
        this.h = 0;
        this.closerH = 0;
        this.visited = false;
        this.closed = false;
    }

    heuristic(
        baseNode: INodeBase,
        pathMode: PathMode,
        endNode?: INodeBase,
    ): number {

        if (pathMode === null) {
            return 0;
        }

        let h: number;
        let dist = this.distanceTo(endNode) * this.manager.weight;

        if ((pathMode === 1) && (baseNode !== undefined)) {
            let deltaAngle = endNode.angleTo(baseNode) - this.angleTo(baseNode);
            h = dist + Math.abs(deltaAngle);
        } else if (pathMode === 2) {
            h = dist + Math.random();
        } else {
            h = dist;
        }

        return h;
    }

    updateCloserH(
        pathMode: PathMode,
        baseNode?: INodeBase,
        endNode?: INodeBase
    ): void {
        if ((pathMode === PathMode.astar) ||
            (pathMode === PathMode['astar-line']) ||
            (pathMode === PathMode['astar-random'])) {
            this.closerH = this.h;
        } else {
            this.closerH = this.closerH || this.heuristic(endNode, pathMode, baseNode);
        }
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

    getNode(
        key: any,
        createNode: boolean = false
    ): INodeBase {

        return this.manager.getNode(key, createNode);
    }

    get pathCost() {
        return this.g;
    }
}