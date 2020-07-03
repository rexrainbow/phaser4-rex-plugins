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

    reset(): void;

    heuristic(
        baseNode: INode,
        pathMode: PathMode,
        endNode?: INode
    ): number;

    updateCloserH(
        pathMode: PathMode,
        baseNode?: INode
    ): void;

    getNextNodes(): INode[];

    getCost(
        preNode: INode
    ): CostValueType;

    distanceBetween(
        node: INode
    ): number;

    angleTo(
        node: INode
    ): number;

}