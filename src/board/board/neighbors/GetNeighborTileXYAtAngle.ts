import { IBoardBase } from '../IBoardBase';
import { XYType } from '../../types';
import { AngleSnapToDirection } from '../worldposition/AngleSnapToDirection';
import { GetTileXYAtDirection } from '../tileposition/GetTileXYAtDirection';

export let GetNeighborTileXYAtAngle = function (
    board: IBoardBase,
    srcTileXY: XYType,
    angle: number,
    out: XYType | true = { x: 0, y: 0 }
): XYType | null {

    let direction = AngleSnapToDirection(board, srcTileXY, angle);
    return GetTileXYAtDirection(board, srcTileXY, direction, 1, out) as XYType;
};