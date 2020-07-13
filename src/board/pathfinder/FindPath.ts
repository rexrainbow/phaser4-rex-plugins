import {
    IPathFinder,
    SearchResultType
} from './IPathFinder';
import { IChess, XYZType, XYType } from '../Types';
import { IsChess, IsTileXYZ } from '../utils';
import { XYToKey } from '../utils/StringKey';
import { IAStarNode } from './astar/IAStarNode';
import { GetPath } from './GetPath'
import { TileXY } from '../board';
import { CopyTileXYZ } from '../utils/CopyTileXYZ';

export let FindPath = function (
    pathFinder: IPathFinder,
    startChess: IChess,
    endChess: IChess | XYType,
    movingPoints?: number,
    isClosest: boolean = true,
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