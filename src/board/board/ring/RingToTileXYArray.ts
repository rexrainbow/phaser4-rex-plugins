import { IBoardBase } from '../IBoardBase';
import { XYType } from '../../types';
import { Contains } from '../tileposition/Contains';

export let RingToTileXYArray = function (
    board: IBoardBase,
    centerTileXY: XYType,
    radius: number = 1,
    out: XYType[] = []
): XYType[] {

    let tileArray = board.grid.ringToTileXYArray(centerTileXY, radius) as XYType[];
    for (let i = 0, cnt = tileArray.length; i < cnt; i++) {
        let tileXY = tileArray[i];
        if (Contains(board, tileXY.x, tileXY.y)) {
            out.push(tileXY);
        }
    }
    return out;
}