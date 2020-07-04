import { IChess, XYType, XYZType } from '../board/ILogicBoard';
import {
    IPathFinder,
    SearchResult
} from './IPathFinder';
import { XYToKey } from './astar/Key';
import { AStarNode } from './astar/AStarNode';
import { SearchMode } from '../../utils/astar/Astar';

export let FindArea = function (
    pathFinder: IPathFinder,
    chess: IChess,
    movingPoints?: number | undefined,
    out: SearchResult = []
): SearchResult {

    let board = pathFinder.board;
    if (
        (!board.hasChess(chess)) ||
        ((movingPoints !== undefined) && (movingPoints <= 0))) {
        return out;
    }

    let astar = pathFinder.astar;
    let startTileXYZ = board.chessToTileXYZ(chess) as XYZType,
        startTileX = startTileXYZ.x,
        startTileY = startTileXYZ.y;
    pathFinder.searchTileZ = startTileXYZ.z;
    astar.setSearchMode(SearchMode.area).search(
        XYToKey(startTileX, startTileY),
        undefined,
        movingPoints
    );
    let nodesMap = astar.getAllNodes() as Map<string, AStarNode>,
        nodesList: AStarNode[] = [];
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