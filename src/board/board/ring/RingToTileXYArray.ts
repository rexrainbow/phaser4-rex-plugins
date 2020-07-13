import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';
import { Contains } from '../tilexy/Contains';

export function RingToTileXYArray(
    board: IBaseBoard,
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