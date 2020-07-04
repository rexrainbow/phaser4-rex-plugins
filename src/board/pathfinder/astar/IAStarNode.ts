import { INodeBase } from '../../../utils/astar/INodeBase';

export interface IAStarNode extends INodeBase {
    x: number;
    y: number;
    cost: number;

    worldX: number;
    worldY: number;
}