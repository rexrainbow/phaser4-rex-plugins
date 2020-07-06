import {
    IPathFinder,
    CostNodeType, CostValueType, BLOCKER
} from './IPathFinder';
import { TileXY, Blocker } from '../board';

export let GetCost = function (
    pathFinder: IPathFinder,
    currNode: CostNodeType,
    prevNode: CostNodeType
): CostValueType {

    let board = pathFinder.board;
    // Occupied test
    if (pathFinder.occupiedTest) {
        if (TileXY.Contains(board, currNode.x, currNode.y, pathFinder.startTileXYZ.z)) {
            return BLOCKER;
        }
    }
    // Blocker test
    if (pathFinder.blockerTest) {
        if (Blocker.HasBlocker(board, currNode.x, currNode.y)) {
            return BLOCKER;
        }
    }
    // Edge-blocker test
    if (pathFinder.edgeBlockerTest) {
        // TODO
    }

    let callback = pathFinder.costCallback;
    if (callback) {
        let scope = pathFinder.costCallbackScope;
        let cost: CostValueType;
        if (scope) {
            cost = callback.call(scope, currNode, prevNode, pathFinder);
        } else {
            cost = callback(currNode, prevNode, pathFinder);
        }
        if (cost === undefined) {
            cost = BLOCKER;
        }
        return cost;
    } else {
        return pathFinder.constCost;
    }
}