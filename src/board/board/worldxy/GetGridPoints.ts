import { IBaseBoard } from '../IBaseBoard';
import { Vec2Type } from '../../Types';

export function GetGridPoints(
    board: IBaseBoard,
    tileX?: number | Vec2Type,
    tileY?: number,
    out?: Vec2Type[] | true
): Vec2Type[] {

    return board.grid.getGridPoints(tileX, tileY, out);
}