import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';
import { RingToTileXYArray } from './RingToTileXYArray'

export let FilledRingToTileXYArray = function (
    board: IBaseBoard,
    centerTileXY: XYType,
    radius: number,
    nearToFar: boolean = true,
    out: XYType[] = []
): XYType[] {

    for (let i = 0; i <= radius; i++) {
        let level = (nearToFar) ? i : (radius - i);
        RingToTileXYArray(board, centerTileXY, level, out);
    }
    return out;
}