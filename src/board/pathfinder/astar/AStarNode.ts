import { IAStarNode } from './IAStarNode';
import { PathMode, CostValueType } from '../../../utils/astar/IAstar';
import { NodeBase } from '../../../utils/astar/NodeBase';
import { IPathFinder } from '../IPathFinder';
import { Shuffle } from '../../../utils/array/Shuffle';
import { XYZType } from '../../board/ILogicBoard';
import { XYToKey, KeyToXY } from './Key';
import { Between as AngleBetween } from '../../../utils/math/angle/Between';

export class AStarNode extends NodeBase {
    pathFinder: IPathFinder;
    isTileXYZ = true;

    x: number;
    y: number;
    cost: number;
    _px: number; // For worldX
    _py: number; // For worldY

    reset(
        key: string
    ) {

        super.reset(key);

        this.key = key;
        KeyToXY(key, this);
        this._px = undefined;
        this._py = undefined;
        this.cost = undefined; // cost cache
    }

    heuristic(
        baseNode: IAStarNode,
        pathMode: PathMode,
        endNode?: IAStarNode,
    ): number {

        return 0;
    }

    getNextNodes(

    ): IAStarNode[] {

        let neighborsTileXY = this.board.getNeighborTileXY(this) as XYZType[];
        if (this.pathFinder.shuffleNeighbors) {
            Shuffle(neighborsTileXY);
        }

        let neighborNodes = [];
        neighborsTileXY.forEach((tileXY) => {
            let node = this.getNode(XYToKey(tileXY.x, tileXY.y), true);
            neighborNodes.push(node);
        })
        return neighborNodes;
    }

    getCost(
        preNode: IAStarNode
    ): CostValueType {

        if (this.pathFinder.cacheCost) {
            if (this.cost === undefined) {
                this.cost = this.pathFinder.getCost(this, preNode);
            }
        } else {
            this.cost = this.pathFinder.getCost(this, preNode);
        }
        return this.cost;
    }

    distanceBetween(
        node: IAStarNode
    ): number {

        return 0;
    }

    angleTo(
        node: IAStarNode
    ): number {

        return AngleBetween(this.worldX, this.wroldY, node.worldX, node.worldX);
    }

    get board() {

        return this.pathFinder.board;
    }

    get worldX() {
        if (this._px === undefined) {
            let worldXY = this.board.tileXYToWorldXY(this.x, this.y, true);
            this._px = worldXY.x;
            this._py = worldXY.y;
        }
        return this._px;
    }

    get wroldY() {
        if (this._py === undefined) {
            let worldXY = this.board.tileXYToWorldXY(this.x, this.y, true);
            this._px = worldXY.x;
            this._py = worldXY.y;
        }
        return this._py;
    }
}