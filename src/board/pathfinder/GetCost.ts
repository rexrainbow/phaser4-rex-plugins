import {
    IPathFinder, IAStartNode,
    CostValueType, BLOCKER
} from './IPathFinder';

export let GetCost = function (
    pathFinder: IPathFinder,
    curNode: IAStartNode,
    preNode: IAStartNode
): CostValueType {

    // Occupied test
    if (pathFinder.occupiedTest) {
        if (pathFinder.board.contains(curNode.x, curNode.y, pathFinder.chessData.tileXYZ.z)) {
            return BLOCKER;
        }
    }
    // Blocker test
    if (pathFinder.blockerTest) {
        if (pathFinder.board.hasBlocker(curNode.x, curNode.y)) {
            return BLOCKER;
        }
    }
    // Edge-blocker test
    if (pathFinder.edgeBlockerTest) {
        // TODO
    }

    if (pathFinder.cost !== undefined) {
        return pathFinder.cost;
    } else {
        let cost: CostValueType;
        if (pathFinder.costCallbackScope) {
            cost = pathFinder.costCallback.call(pathFinder.costCallbackScope, curNode, preNode, pathFinder);
        } else {
            cost = pathFinder.costCallback(curNode, preNode, pathFinder);
        }
        if (cost === undefined) {
            cost = BLOCKER;
        }
        return cost;
    }
}