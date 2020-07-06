import { IBoardBase } from '../IBoardBase';
import { XYType } from '../../types';
import { RingToTileXYArray } from './RingToTileXYArray'

export let FilledRingToTileXYArray = function (
    board: IBoardBase,
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