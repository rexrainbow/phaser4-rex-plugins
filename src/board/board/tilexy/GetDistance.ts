import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';

export let GetDistance = function (
    board: IBaseBoard,
    tileA: XYType,
    tileB: XYType,
    roughMode?: boolean
): number {

    return board.grid.getDistance(tileA, tileB, roughMode);
}