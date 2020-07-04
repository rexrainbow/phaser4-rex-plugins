import { IPathFinder } from '../IPathFinder';
import { AStar } from '../../../utils/astar/Astar';
import { AStarNode } from './AStarNode';

export { AStar };

export let CreateAStar = function (
    pathFinder: IPathFinder
): AStar {

    let CreateNodeCallback = function (pathFinder: IPathFinder) {
        return new AStarNode(pathFinder);
    }
    return new AStar(pathFinder, CreateNodeCallback);
}