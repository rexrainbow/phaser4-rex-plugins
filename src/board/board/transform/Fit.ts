// Offset tileXYArray to (0,0), and set board size to fit tileXYArray
import { IBoardBase } from '../IBoardBase';
import { XYType } from '../../types';
import { Offset } from './Offset';
import { SetBoardHeight } from '../boarddata/SetBoardHeight';
import { SetBoardWidth } from '../boarddata/SetBoardWidth';

export let Fit = function (
    board: IBoardBase,
    tileXYArray: XYType[]
): XYType[] {

    // Get minimum tileX, tileY
    let minX = Infinity;
    let minY = Infinity;
    let tileXY: XYType;
    for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        minX = Math.min(minX, tileXY.x);
        minY = Math.min(minY, tileXY.y);
    }
    // Offset tileXYArray to (0,0)
    if ((minX !== 0) || (minY !== 0)) {
        for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
            tileXY = tileXYArray[i];
            Offset(board, tileXY, -minX, -minY, tileXY);
        }
    }

    // Get maximun tileX, tileY
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        tileXY = tileXYArray[i];
        maxX = Math.max(maxX, tileXY.x);
        maxY = Math.max(maxY, tileXY.y);
    }

    // Set board size
    SetBoardWidth(board, maxX + 1);
    SetBoardHeight(board, maxY + 1);

    return tileXYArray;
}