import {
    IPathFinder,
    CostNodeType, CostValueType, BLOCKER
} from './IPathFinder';

export let GetCost = function (
    pathFinder: IPathFinder,
    currNode: CostNodeType,
    prevNode: CostNodeType
): CostValueType {

    // Occupied test
    if (pathFinder.occupiedTest) {
        if (pathFinder.board.contains(currNode.x, currNode.y, pathFinder.searchTileZ)) {
            return BLOCKER;
        }
    }
    // Blocker test
    if (pathFinder.blockerTest) {
        if (pathFinder.board.hasBlocker(currNode.x, currNode.y)) {
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