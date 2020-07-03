import {
    PathMode,
    CostValueType,
    BLOCKER
} from './IAstar';
import { INode } from './INode';

export class NodeBase implements INode {
    f: number;
    g: number;
    h: number;
    closerH: number;

    visited: boolean;
    closed: boolean;

    preNodes: INode[];
    sn: number; // For sorting by created order

    constructor() {
        this.preNodes = [];
    }

    reset(): void {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.closerH = 0;
        this.visited = false;
        this.closed = false;
        this.preNodes.length = 0;
    }

    heuristic(
        baseNode: INode,
        pathMode: PathMode,
        endNode?: INode,
    ): number {

        return 0;
    }

    updateCloserH(
        pathMode: PathMode,
        baseNode?: INode
    ): void {

    }


    getNextNodes(

    ): INode[] {

        return [];
    }

    getCost(
        preNode: INode
    ): CostValueType {

        return BLOCKER;
    }

    distanceBetween(
        node: INode
    ): number {

        return 0;
    }

    angleTo(
        node: INode
    ): number {
        return 0;

    }
}