import { IAStar } from '../IAStar';
import { INodeBase } from '../INodeBase';
import { PathMode } from '../types/PathMode';
import { GetNodePathCallbackType } from './GetNodePathCallbackType';
import { GetAStarNodePath } from './GetAStarNodePath';
import { GetRandomNodePath } from './GetRandomNodePath';
import { GetLineNodePath } from './GetLineNodePath';
import { GetDiagonalPath } from './GetDiagonalPath';
import { GetStraightNodePath } from './GetStraightNodePath';

export let GetNodePath = function (
    astar: IAStar,
    startNodeKey: any,
    endNodeKey: any
): INodeBase[] {

    let nodeManager = astar.nodeManager;
    let endNode = nodeManager.getNode(endNodeKey);
    let path: INodeBase[] = [];
    if (endNode === null) {
        return path;
    }

    let startNode = nodeManager.getNode(startNodeKey);
    return GetNodePathCallbacks[astar.pathMode](startNode, endNode, path);
}

let GetNodePathCallbacks: { [mode: number]: GetNodePathCallbackType } = {};
GetNodePathCallbacks[PathMode.astar] = GetAStarNodePath;
GetNodePathCallbacks[PathMode['astar-line']] = GetAStarNodePath;
GetNodePathCallbacks[PathMode['astar-random']] = GetAStarNodePath;
GetNodePathCallbacks[PathMode.random] = GetRandomNodePath;
GetNodePathCallbacks[PathMode.line] = GetLineNodePath;
GetNodePathCallbacks[PathMode.diagonal] = GetDiagonalPath;
GetNodePathCallbacks[PathMode.straight] = GetStraightNodePath;