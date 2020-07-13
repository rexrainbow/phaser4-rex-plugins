import { IPathFinder, CostValueType } from './IPathFinder';
import { XType, YType } from '../Types';
import { XYToKey } from '../utils/StringKey';
import { IAStarNode } from './astar/IAStarNode';

export function TileXYToCost(
    pathFinder: IPathFinder,
    tileX: XType,
    tileY: YType,
    pathCost: boolean = true
): CostValueType {

    let node = pathFinder.astar.getNode(XYToKey(tileX, tileY)) as IAStarNode;
    if (node === null) {
        return null;
    }
    return (pathCost) ? node.g : node.cost;
}