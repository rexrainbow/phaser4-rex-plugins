import { IChess, XYType } from '../board/ILogicBoard';
import { IPathFinder } from './IPathFinder';
import { XYToKey } from './astar/Key';
import { AStarNode } from './astar/AStarNode';
import { SearchMode } from '../../utils/astar/IAstar';

export let FindArea = function (
    pathFinder: IPathFinder,
    chess: IChess,
    movingPoints?: number | undefined,
    out: XYType[] = []
): XYType[] {

    let board = pathFinder.board;
    if (
        (!board.hasChess(chess)) ||
        ((movingPoints !== undefined) && (movingPoints <= 0))) {
        return out;
    }

    let astar = pathFinder.astar;
    let startTileXYZ = board.chessToTileXYZ(chess),
        startTileX = startTileXYZ.x,
        startTileY = startTileXYZ.y;
    astar.setSearchMode(SearchMode.area).search(
        XYToKey(startTileX, startTileY),
        undefined,
        movingPoints
    );
    let nodeMap = astar.getAllNodes(),
        nodesList: AStarNode[] = [];
    for (const [key, node] of nodeMap) {
        if ((node.x === startTileX) && (node.y === startTileY)) {
            continue;
        }
    }
    for (let key in nodes) {
        node = nodes[key];
        // not include start node
        if ((node.x === startTileX) && (node.y === startTileY)) {
            continue;
        }
        // not include open node
        if (!node.closed) {
            continue;
        }
        nodesList.push(node);
    }
    // sort by sn (creating order)
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