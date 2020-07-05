import { IPathFinder, SearchResultType } from './IPathFinder';
import { IChess, XYZType } from '../board/ILogicBoard';
import { XYToKey } from './astar/Key';
import { IAStarNode } from './astar/IAStarNode';

export let FindArea = function (
    pathFinder: IPathFinder,
    startChess: IChess,
    movingPoints?: number | undefined,
    out: SearchResultType = []
): SearchResultType {

    let board = pathFinder.board;
    // Chess not at board
    if (!board.hasChess(startChess)) {
        return out;
    }
    // Negative moving points
    if ((movingPoints !== undefined) && (movingPoints <= 0)) {
        return out;
    }

    let astar = pathFinder.astar;
    let startTileXYZ = board.chessToTileXYZ(startChess) as XYZType,
        startTileX = startTileXYZ.x,
        startTileY = startTileXYZ.y;
    pathFinder.startTileXYZ = startTileXYZ;
    let startNodeKey = XYToKey(startTileX, startTileY);
    astar.search(startNodeKey, null, movingPoints);

    let nodesMap = astar.getAllNodes() as Map<string, IAStarNode>,
        nodesList: IAStarNode[] = [];
    for (const [key, node] of nodesMap) {
        // Not include start node
        if ((node.x === startTileX) && (node.y === startTileY)) {
            continue;
        }

        if (!node.closed) {
            continue;
        }
        nodesList.push(node);
    }
    // Sort by sn (creating order)
    nodesList.sort(function (nodeA, nodeB) {
        let snA = nodeA.sn;
        let snB = nodeB.sn;
        return (snA > snB) ? 1 :
            (snA < snB) ? -1 :
                0;
    });
    nodesList.forEach(function (node) {
        out.push({
            x: node.x,
            y: node.y,
            cost: node.g
        });
    })
    return out;
}