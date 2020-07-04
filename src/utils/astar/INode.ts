import {
    PathMode,
    CostValueType
} from './IAStar';

export interface INode {
    f: number;
    g: number;
    h: number;
    closerH: number;

    visited: boolean;
    closed: boolean;

    preNodes: INode[];
    sn: number; // For sorting by created order
    pathCost: number;

    // Override
    reset(key: any): void;

    shutdown(): void;

    // Override
    heuristic(
        baseNode: INode,
        pathMode: PathMode,
        endNode?: INode
    ): number;

    updateCloserH(
        pathMode: PathMode,
        baseNode?: INode
    ): void;

    // Override
    getNextNodes(): INode[];

    // Override
    getCost(
        preNode: INode
    ): CostValueType;

    // Override
    distanceBetween(
        node: INode
    ): number;

    // Override
    angleTo(
        node: INode
    ): number;

}