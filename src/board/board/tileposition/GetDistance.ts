import { IBoardBase } from '../IBoardBase';
import { XYType } from '../../types';

export let GetDistance = function (
    board: IBoardBase,
    tileA: XYType,
    tileB: XYType,
    roughMode?: boolean
): number {

    return board.grid.getDistance(tileA, tileB, roughMode);
}