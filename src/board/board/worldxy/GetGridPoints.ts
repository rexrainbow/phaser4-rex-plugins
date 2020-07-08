import { IBaseBoard } from '../IBaseBoard';
import { Vec2Type } from '../../types';


export let GetGridPoints = function (
    board: IBaseBoard,
    tileX?: number | Vec2Type,
    tileY?: number,
    out?: Vec2Type[] | true
): Vec2Type[] {

    return board.grid.getGridPoints(tileX, tileY, out);
}