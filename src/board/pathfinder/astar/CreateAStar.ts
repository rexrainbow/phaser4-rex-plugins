import { IPathFinder } from '../IPathFinder';
import { IAStar } from '../../../utils/astar/IAstar';
import { AStar } from '../../../utils/astar/AStar';
import { AStarNode } from './AStarNode';

export { IAStar };

export let CreateAStar = function (
    pathFinder: IPathFinder
): IAStar {

    let CreateNodeCallback = function (pathFinder: IPathFinder) {
        return new AStarNode(pathFinder);
    }
    return new AStar<string, AStarNode>(pathFinder, CreateNodeCallback);
}