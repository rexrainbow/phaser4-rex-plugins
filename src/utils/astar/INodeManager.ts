import { INode } from './INode';

export type NodeMapType = Map<any, INode>;

export interface INodeManager {

    getNode(
        key: any,
        createNode?: boolean
    ): INode | null;

    freeAllNodes(): this;

    getAllNodes(): NodeMapType;
}