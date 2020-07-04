import {
    IAStar, INode,
    SearchMode, PathMode,
    CostValueType, BLOCKER
} from './IAstar';
import { BinaryHeap } from '../struct/BinaryHeap';

var gOpenHeap = new BinaryHeap((node: INode) => node.f);

export let Search = function (
    astar: IAStar,
    startNodeKey: any,
    endNodeKey: any,
    movingPoints?: number
): void {
    const isPathSearch = (astar.searchMode === SearchMode.path);
    const isShortestPathMode = isPathSearch && (astar.pathMode === PathMode.all);
    const astarHeuristicMode = (isPathSearch) ? astar.pathMode : null;

    let nodeManager = astar.nodeManager;
    nodeManager.freeAllNodes();

    let startNode = nodeManager.getNode(startNodeKey, true);
    let endNode = (endNodeKey !== null) ? nodeManager.getNode(endNodeKey) : null;
    startNode.h = startNode.heuristic(endNodeKey, astarHeuristicMode);

    let closestNode = startNode;
    if (isPathSearch) {
        closestNode.updateCloserH(astarHeuristicMode);
    }

    gOpenHeap.push(startNode);
    while (gOpenHeap.size > 0) {
        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        let currNode = gOpenHeap.pop() as INode;

        // End case -- result has been found, return the traced path.
        if (isPathSearch && (currNode === endNode)) {
            closestNode = endNode;
            break;
        }

        // Normal case -- move currNode from open to closed, process each of its next-nodes.
        currNode.closed = true;

        // Find all next-nodes for the current node.
        let nextNodes: INode[] = currNode.getNextNodes();
        let nextNode: INode,
            neighborCost: CostValueType,
            isNeighborMoreCloser: boolean;
        for (let i = 0, cnt = nextNodes.length; i < cnt; ++i) {
            nextNode = nextNodes[i];
            neighborCost = nextNode.getCost(currNode);
            if (nextNode.closed || (neighborCost === BLOCKER)) {
                // Not a valid node to process, skip to next-node.
                continue;
            }

            // The g score is the shortest distance from start to current node.
            // We need to check if the path we have arrived at this next-node is the shortest one we have seen yet.
            let gScore = currNode.g + neighborCost,
                beenVisited = nextNode.visited;

            if ((movingPoints !== undefined) && (gScore > movingPoints)) {
                continue;
            }

            if ((!beenVisited) || (gScore < nextNode.g)) {

                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                nextNode.visited = true;
                nextNode.preNodes.length = 0;
                nextNode.preNodes.push(currNode);
                nextNode.h = nextNode.h || nextNode.heuristic(endNode, astarHeuristicMode, startNode);
                nextNode.g = gScore;
                nextNode.f = nextNode.g + nextNode.h;

                // Nearest node
                if (isPathSearch) {
                    nextNode.updateCloserH(astarHeuristicMode, startNode);
                    isNeighborMoreCloser = (nextNode.closerH < closestNode.closerH) ||
                        ((nextNode.closerH === closestNode.closerH) && (nextNode.g < closestNode.g));

                    if (isNeighborMoreCloser) {
                        closestNode = nextNode;
                    }
                }
                // Nearest node

                if (!beenVisited) {
                    // Pushing to heap will put it in proper place based on the 'f' value.
                    gOpenHeap.push(nextNode);
                } else {
                    // Already seen the node, but since it has been rescored we need to reorder it in the heap
                    gOpenHeap.rescoreElement(nextNode);
                }
            } else if (isShortestPathMode && (gScore == nextNode.g)) {
                nextNode.preNodes.push(currNode);

            }
        }

    }

    gOpenHeap.clear();
}