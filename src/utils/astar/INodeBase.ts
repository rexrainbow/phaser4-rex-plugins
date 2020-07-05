import { CostValueType } from './types/CostValueType';
import { PathMode } from './types/PathMode';
import { INodeManager } from './INodeManager';

export interface INodeBase {
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

    shutdown(): void;
    destroy(): void;

    // Override
    reset(key: any): void;

    heuristic(
        baseNode: INodeBase,
        astarMode: PathMode,
        endNode?: INodeBase,
    ): number;

    // Override
    getNextNodes(): INodeBase[];

    getCost(
        preNode: INodeBase
    ): CostValueType;

    // Override
    distanceTo(
        node: INodeBase
    ): number;

    // Override
    angleTo(
        node: INodeBase
    ): number;

    // Override
    logicDirTo(
        node: INodeBase
    ): number;

    getNode(
        key: any,
        createNode?: boolean
    ): INodeBase;
}