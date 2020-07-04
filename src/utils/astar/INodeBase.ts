import { CostValueType } from './types/CostValueType';
import { PathMode } from './types/PathMode';
import { INodeManager } from './INodeManager';

export interface INodeBase {
    pathFinder: object;
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
    pathCost: number;

    shutdown(): void;
    destroy(): void;

    // Override
    reset(key: any): void;

    // Override
    heuristic(
        baseNode: INodeBase,
        pathMode: PathMode,
        endNode?: INodeBase,
    ): number;

    updateCloserH(
        pathMode: PathMode,
        baseNode?: INodeBase,
        endNode?: INodeBase
    ): void;

    // Override
    getNextNodes(): INodeBase[];

    getCost(
        preNode: INodeBase
    ): CostValueType;

    distanceBetween(
        node: INodeBase
    ): number;

    angleTo(
        node: INodeBase
    ): number;

    getNode(
        key: any,
        createNode?: boolean
    ): INodeBase;
}