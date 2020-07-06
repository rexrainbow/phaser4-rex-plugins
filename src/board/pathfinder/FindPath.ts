import {
    IPathFinder,
    SearchResultType
} from './IPathFinder';
import { IChess, XYZType, XYType } from '../types';
import { XYToKey } from './astar/Key';
import { IAStarNode } from './astar/IAStarNode';
import { GetPath } from './GetPath'
import { Chess, TileXY } from '../board';
import { CopyTileXYZ } from '../board/utils/CopyTileXYZ';

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
    if (!Chess.HasChess(board, startChess)) {
        return out;
    }
    // Negative moving points
    if ((movingPoints !== undefined) && (movingPoints <= 0)) {
        return out;
    }

    let astar = pathFinder.astar;
    let startTileXYZ = TileXY.ChessToTileXYZ(board, startChess) as XYZType;
    let endTileXY = TileXY.ChessToTileXYZ(board, endChess) as XYType;
    CopyTileXYZ(startTileXYZ, pathFinder.startTileXYZ);
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