import {
    ILogicBoard,
    XYType
} from '../ILogicBoard';

export let GetNeighborTileXY = function (
    board: ILogicBoard,
    srcTileXY: XYType,
    directions: number | number[] | string | null,
    out: XYType | true = { x: 0, y: 0 }
): XYType | XYType[] | null {

    return board.getTileXYAtDirection(srcTileXY, directions, 1, out);
};