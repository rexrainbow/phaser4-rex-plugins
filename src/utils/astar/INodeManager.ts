import { INodeBase } from './INodeBase';

export interface INodeManager {
    weight: number;

    getNode(
        key: any,
        createNode?: boolean
    ): INodeBase | null;

    freeAllNodes(): this;

    getAllNodes(): Map<any, INodeBase>;
}