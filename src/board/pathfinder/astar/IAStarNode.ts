import { INodeBase } from '../../../utils/astar/INodeBase';
import { IPathFinder } from '../IPathFinder';

export interface IAStarNode extends INodeBase {
    pathFinder: IPathFinder;

    x: number;
    y: number;
    cost: number;

    worldX: number;
    worldY: number;
}