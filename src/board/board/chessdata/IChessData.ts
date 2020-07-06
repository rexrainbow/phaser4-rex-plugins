import {
    ILogicBoard,
    ZType, XYZType
} from '../ILogicBoard';

export type BlockerType = boolean;
export type EdgeBlockerType = { [direction: number]: boolean };
export interface IChessData {
    parent: any;
    board: ILogicBoard | null;
    blocker: BlockerType | EdgeBlockerType;

    setBoard(board: ILogicBoard | null): this;
    readonly tileXYZ: XYZType | null;
    setTileZ(tileZ: ZType): this;

}