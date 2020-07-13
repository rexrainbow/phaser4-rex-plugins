import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';
import { AngleSnapToDirection } from '../worldxy/AngleSnapToDirection';
import { GetTileXYAtDirection } from '../tilexy/GetTileXYAtDirection';

export let GetNeighborTileXYAtAngle = function (
    board: IBaseBoard,
    srcTileXY: XYType,
    angle: number,
    out: XYType | true = { x: 0, y: 0 }
): XYType | null {

    let direction = AngleSnapToDirection(board, srcTileXY, angle);
    return GetTileXYAtDirection(board, srcTileXY, direction, 1, out) as XYType;
};