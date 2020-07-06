import { IPathFinder, CostValueType } from './IPathFinder';
import { XType, YType } from '../types';
import { XYToKey } from './astar/Key';
import { IAStarNode } from './astar/IAStarNode';

export let TileXYToCost = function (
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