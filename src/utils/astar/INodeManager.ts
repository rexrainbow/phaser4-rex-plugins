import { INodeBase } from './INodeBase';

export interface INodeManager {
    getNode(
        key: any,
        createNode?: boolean
    ): INodeBase | null;

    freeAllNodes(): this;

    getAllNodes(): Map<any, INodeBase>;
}