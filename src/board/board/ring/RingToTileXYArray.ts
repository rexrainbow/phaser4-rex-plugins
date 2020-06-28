import {
    ILogicBoard,
    XYType
} from '../ILogicBoard';

export let RingToTileXYArray = function (
    board: ILogicBoard,
    centerTileXY: XYType,
    radius: number = 1,
    out: XYType[] = []
): XYType[] {

    let tileArray = board.grid.ringToTileXYArray(centerTileXY, radius) as XYType[];
    for (let i = 0, cnt = tileArray.length; i < cnt; i++) {
        let tileXY = tileArray[i];
        if (board.contains(tileXY.x, tileXY.y)) {
            out.push(tileXY);
        }
    }
    return out;
}