import {
    IPathFinder,
    SearchResultType
} from './IPathFinder';
import { IChess, XYZType, XYType } from '../board/ILogicBoard';
import { XYToKey } from './astar/Key';
import { IAStarNode } from './astar/IAStarNode';
import { GetPath } from './GetPath';

export let FindPath = function (
    pathFinder: IPathFinder,
    startChess: IChess,
    endChess: IChess | XYType,
    movingPoints?: number,
    isClosest: boolean = true,
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
    let startTileXYZ = board.chessToTileXYZ(startChess) as XYZType;
    let endTileXY = board.chessToTileXYZ(endChess) as XYType;
    pathFinder.startTileXYZ = startTileXYZ;
    let startNodeKey = XYToKey(startTileXYZ.x, startTileXYZ.y),
        endNodeKey = XYToKey(endTileXY.x, endTileXY.y);

    astar
        .setPathMode(pathFinder.pathMode)
        .setWeight(pathFinder.weight)
        .search(startNodeKey, endNodeKey, movingPoints);

    let endNode = ((isClosest) ? astar.getClosestNode() : astar.getNode(endNodeKey)) as IAStarNode;
    if (endNode === null) {
        return out;
    }

    return GetPath(pathFinder, (endNode as XYType), out);
}
export default FindPath;