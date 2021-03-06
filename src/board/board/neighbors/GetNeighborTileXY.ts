import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';
import { GetTileXYAtDirection } from '../tilexy/GetTileXYAtDirection';

export function GetNeighborTileXY(
    board: IBaseBoard,
    srcTileXY: XYType,
    directions: number | number[] | string | null = null,
    out: XYType | true = { x: 0, y: 0 }
): XYType | XYType[] | null {

    return GetTileXYAtDirection(board, srcTileXY, directions, 1, out);
};