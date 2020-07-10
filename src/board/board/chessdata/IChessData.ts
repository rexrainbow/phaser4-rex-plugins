import { IBaseBoard } from '../IBaseBoard';
import { ZType, XYZType } from '../../types';

export type BlockerType = boolean;
export type EdgeBlockerType = { [direction: number]: boolean };

export interface IChessData {
    parent: unknown;
    board: IBaseBoard | null;
    blocker: BlockerType | EdgeBlockerType;

    setBoard(board: IBaseBoard | null): this;
    readonly tileXYZ: XYZType | null;
}