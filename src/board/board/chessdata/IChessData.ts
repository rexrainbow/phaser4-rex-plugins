import { IBoardBase } from '../IBoardBase';
import { ZType, XYZType } from '../../types';

export type BlockerType = boolean;
export type EdgeBlockerType = { [direction: number]: boolean };

export interface IChessData {
    parent: any;
    board: IBoardBase | null;
    blocker: BlockerType | EdgeBlockerType;

    setBoard(board: IBoardBase | null): this;
    readonly tileXYZ: XYZType | null;
    setTileZ(tileZ: ZType): this;

}