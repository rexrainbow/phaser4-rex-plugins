import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';

export function GetDistance(
    board: IBaseBoard,
    tileA: XYType,
    tileB: XYType,
    roughMode?: boolean
): number {

    return board.grid.getDistance(tileA, tileB, roughMode);
}