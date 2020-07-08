import { INodeBase } from './INodeBase';

export interface INodeManager {
    weight: number;
    closestNode: INodeBase;

    destroy():void

    getNode(
        key: any,
        createNode?: boolean
    ): INodeBase | null;

    freeAllNodes(): this;

    getAllNodes(): Map<any, INodeBase>;
}