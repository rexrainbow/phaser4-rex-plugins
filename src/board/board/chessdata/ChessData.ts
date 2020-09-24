import { XYZType } from '../../Types';
import { IBaseBoard } from '../IBaseBoard';
import {
    IChessData,
    BlockerType, EdgeBlockerType
} from './IChessData';

export class ChessData implements IChessData {
    parent: any;
    board: IBaseBoard | null = null;
    blocker: BlockerType | EdgeBlockerType = false;

    constructor(parent: any) {
        this.parent = parent;
        this.boot();
    }

    boot() {
        if ((typeof (this.parent) === 'object') && this.parent.on) {
            this.parent.on('destroy', this.destroy, this);
        }
    }

    destroy() {
        if (this.board) {
            let tileXYZ = this.tileXYZ;
            this.board.boardData.removeChess(tileXYZ.x, tileXYZ.y, tileXYZ.z);
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
        return this.board.boardData.getXYZ(this.parent);
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