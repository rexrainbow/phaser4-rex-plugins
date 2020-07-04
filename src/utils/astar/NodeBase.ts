import {
    PathFinderType,
    PathMode,
    CostValueType,
    BLOCKER
} from './Astar';
import { NodeManager } from './NodeManager';

export abstract class NodeBase {
    pathFinder: PathFinderType;
    manager: NodeManager;

    f: number;
    g: number;
    h: number;
    closerH: number;

    visited: boolean;
    closed: boolean;

    preNodes: NodeBase[];
    key: any; // string, number or an object
    sn: number; // For sorting by created order

    constructor(
        pathFinder: PathFinderType
    ) {

        this.pathFinder = pathFinder;
        this.preNodes = [];
    }

    shutdown(): void {
        this.key = undefined;
    }

    destroy() {
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
        this.preNodes.length = 0;
    }

    // Override
    heuristic(
        baseNode: NodeBase,
        pathMode: PathMode,
        endNode?: NodeBase,
    ): number {

        return 0;
    }

    updateCloserH(
        pathMode: PathMode,
        baseNode?: NodeBase,
        endNode?: NodeBase
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
    getNextNodes(
    ): NodeBase[] {

        return [];
    }

    // Override
    getCost(
        preNode: NodeBase
    ): CostValueType {

        return BLOCKER;
    }

    // Override
    distanceBetween(
        node: NodeBase
    ): number {

        return 0;
    }

    // Override
    angleTo(
        node: NodeBase
    ): number {

        return 0;
    }

    getNode(
        key: any,
        createNode: boolean = false
    ): NodeBase {

        return this.manager.getNode(key, createNode);
    }

    get pathCost() {
        return this.g;
    }
}