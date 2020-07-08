import { IPathFinder, SearchResultType } from './IPathFinder';
import { IChess, XYZType } from '../types';
import { IsChess, IsTileXYZ } from '../utils';
import { XYToKey } from './astar/Key';
import { IAStarNode } from './astar/IAStarNode';
import { Chess, TileXY } from '../board';
import { CopyTileXYZ } from '../utils/CopyTileXYZ';

export let FindArea = function (
    pathFinder: IPathFinder,
    startChess: IChess | XYZType,
    movingPoints?: number | undefined,
    out: SearchResultType = []
): SearchResultType {

    // Negative moving points
    if ((movingPoints !== undefined) && (movingPoints <= 0)) {
        return out;
    }
    if (IsChess(startChess)) {
        pathFinder.board = (startChess as IChess).rexChess.board;
    } else if (!IsTileXYZ(startChess)) { // Not a chess, neither tileXYZ
        return out;
    }

    let board = pathFinder.board;
    let astar = pathFinder.astar;
    let startTileXYZ = TileXY.ChessToTileXYZ(board, startChess) as XYZType,
        startTileX = startTileXYZ.x,
        startTileY = startTileXYZ.y;
    CopyTileXYZ(startTileXYZ, pathFinder.startTileXYZ);
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