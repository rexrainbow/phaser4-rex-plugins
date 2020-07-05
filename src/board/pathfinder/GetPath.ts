import {
    IPathFinder,
    SearchResultType
} from './IPathFinder';
import { XYType, IChess } from '../board/ILogicBoard';
import { XYToKey } from './astar/Key';
import { IAStarNode } from './astar/IAStarNode';

export let GetPath = function (
    pathFinder: IPathFinder,
    endChess: IChess | XYType,
    out: SearchResultType = []
): SearchResultType {

    let board = pathFinder.board;
    let endTileXY: XYType = board.chessToTileXYZ(endChess);
    let startTileXYZ = pathFinder.startTileXYZ;
    let nodesList = pathFinder.astar
        .setPathMode(pathFinder.pathMode)
        .getNodePath(
            XYToKey(startTileXYZ.x, startTileXYZ.y),
            XYToKey(endTileXY.x, endTileXY.y)
        ) as IAStarNode[];
    nodesList.forEach(function (node) {
        out.push({
            x: node.x,
            y: node.y,
            cost: node.g
        });
    })
    return out;
}