/* 

javascript-astar 0.3.0
http://github.com/bgrins/javascript-astar
Freely distributable under the MIT License.
Implements the astar search algorithm in javascript using a Binary Heap.
Includes Binary Heap (with modifications) from Marijn Haverbeke.
http://eloquentjavascript.net/appendix2.html

*/

import { IAStar } from './IAstar';
import { PathMode, IsAStarMode } from './types/PathMode';
import { CostValueType } from './types/CostValueType';
import { BLOCKER, INFINITY } from './Const';
import { INodeBase } from './INodeBase';
import { BinaryHeap } from '../struct/BinaryHeap';

let gOpenHeap = new BinaryHeap((node: INodeBase) => node.f);

export function Search(
    astar: IAStar,
    startNodeKey: any,
    endNodeKey: any,
    movingPoints?: number
): void {

    const isPathSearch = (endNodeKey !== null);
    const isAStartMode = IsAStarMode(astar.pathMode);
    const isShortestPathMode = isPathSearch && (!isAStartMode);
    const astarMode = (isPathSearch && isAStartMode) ? astar.pathMode : null;

    let nodeManager = astar.nodeManager;
    nodeManager.freeAllNodes();

    let startNode = nodeManager.getNode(startNodeKey, true);
    let endNode = (isPathSearch) ? nodeManager.getNode(endNodeKey, true) : null;
    startNode.h = startNode.heuristic(endNode, astarMode);

    let closestNode: INodeBase = null;
    if (isPathSearch) {
        closestNode = startNode;
        closestNode.closerH = closestNode.h || closestNode.heuristic(endNode, PathMode.astar);
    }

    gOpenHeap.push(startNode);
    while (gOpenHeap.size > 0) {
        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        let currNode = gOpenHeap.pop() as INodeBase;
        // console.log(currNode.key);

        // End case -- result has been found, return the traced path.
        if (isPathSearch && (currNode === endNode)) {
            closestNode = endNode;
            break;
        }

        // Normal case -- move currNode from open to closed, process each of its next-nodes.
        currNode.closed = true;

        // Find all next-nodes for the current node.
        let nextNodes: INodeBase[] = currNode.getNextNodes();
        let nextNode: INodeBase,
            nextNodeCost: CostValueType;
        for (let i = 0, cnt = nextNodes.length; i < cnt; ++i) {
            nextNode = nextNodes[i];
            nextNodeCost = nextNode.getCost(currNode);
            if (nextNode.closed || (nextNodeCost === BLOCKER)) {
                // Not a valid node to process, skip to next-node.
                continue;
            }

            // The g score is the shortest distance from start to current node.
            // We need to check if the path we have arrived at this next-node is the shortest one we have seen yet.
            let gScore = currNode.g + nextNodeCost,
                beenVisited = nextNode.visited;

            if ((movingPoints !== INFINITY) && (gScore > movingPoints)) {
                continue;
            }

            if ((!beenVisited) || (gScore < nextNode.g)) {

                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                nextNode.visited = true;
                nextNode.prevNodes.length = 0;
                nextNode.prevNodes.push(currNode);
                if (nextNode.h === undefined) {
                    nextNode.h = nextNode.heuristic(endNode, astarMode, startNode);
                }
                nextNode.g = gScore;
                nextNode.f = nextNode.g + nextNode.h;

                // Nearest node
                if (isPathSearch) {
                    // If the next node is closer than the current closestNode or if it's equally close but has
                    // a cheaper path than the current closest node then it becomes the closest node
                    if (nextNode.closerH === undefined) {
                        nextNode.closerH = nextNode.h || nextNode.heuristic(endNode, PathMode.astar);
                    }
                    if ((nextNode.closerH < closestNode.closerH) ||
                        ((nextNode.closerH === closestNode.closerH) && (nextNode.g < closestNode.g))) {
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

                nextNode.prevNodes.push(currNode);
            }
        }

    }

    nodeManager.closestNode = closestNode;
    gOpenHeap.clear();
}