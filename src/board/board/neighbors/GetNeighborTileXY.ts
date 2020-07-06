import {
    ILogicBoard,
    XYType
} from '../ILogicBoard';
import { GetTileXYAtDirection } from '../tileposition/GetTileXYAtDirection';

export let GetNeighborTileXY = function (
    board: ILogicBoard,
    srcTileXY: XYType,
    directions: number | number[] | string | null = null,
    out: XYType | true = { x: 0, y: 0 }
): XYType | XYType[] | null {

    return GetTileXYAtDirection(board, srcTileXY, directions, 1, out);
};