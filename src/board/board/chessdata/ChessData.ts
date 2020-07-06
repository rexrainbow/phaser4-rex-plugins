import { IBaseBoard } from '../IBaseBoard';
import { ZType, XYZType } from '../../types';

import {
    IChessData,
    BlockerType, EdgeBlockerType
} from './IChessData';
import { ChessToTileXYZ } from '../tileposition/ChessToTileXYZ';

export class ChessData implements IChessData {
    parent: any;
    board: IBaseBoard | null;
    blocker: BlockerType | EdgeBlockerType;

    constructor(parent: any) {
        this.parent = parent;
        this.board = null;
        this.blocker = false;
        this.boot();
    }

    boot() {
        if ((typeof (this.parent) === 'object') && this.parent.on) {
            this.parent.on('destroy', this.destroy, this);
        }
    }

    destroy() {
        if (this.board) {
            this.board.removeChess(this.parent);
        }

        this.parent = undefined;
        this.board = null;
    }

    setBoard(board: IBaseBoard | null): this {

        this.board = board;
        return this;
    }

    get tileXYZ(): XYZType | null {
        if (this.board == null) {
            return null;
        }
        return ChessToTileXYZ(this.board, this.parent) as XYZType | null;
    }

    setTileZ(tileZ: ZType): this {

        if (this.board == null) {
            return this;
        }

        let tileXYZ = this.tileXYZ;
        this.board.addChess(this.parent, tileXYZ.x, tileXYZ.y, tileZ, false);
        return this;
    }

    setBlocker(value: boolean = true): this {

        this.blocker = value;
        return this;
    }

    setBlockEdge(
        direction: number | object,
        value: boolean = true
    ): this {

        if (typeof (this.blocker) === 'boolean') {
            this.blocker = {};
        }

        let blocker = this.blocker;
        if (typeof (direction) === 'object') {
            let blockEdges = direction;
            for (let dir in blockEdges) {
                blocker[dir] = blockEdges[dir];
            }
        } else {
            blocker[direction] = value;
        }
        return this;
    }

    getBlockEdge(direction: number): boolean {

        if (typeof (this.blocker) === 'boolean') {
            return false;
        }

        if (!this.blocker.hasOwnProperty(direction)) {
            return false;
        } else {
            return this.blocker[direction];
        }
    }
}