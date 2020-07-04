import { IPathFinder } from '../IPathFinder';
import { IAStar } from '../../../utils/astar/IAStar';
import { AStar } from '../../../utils/astar/AStar';
import { AStarNode } from './AStarNode';

export let CreateAStar = function (
    pathFinder: IPathFinder
): IAStar {

    let CreateNodeCallback = function () {
        return new AStarNode(pathFinder);
    }
    return new AStar(CreateNodeCallback);
}