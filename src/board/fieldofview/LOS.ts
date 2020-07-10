import { IFieldOfView } from './IFieldOfView';
import { IChess, XYType } from '../types';
import { IsInLOS } from './IsInLOS';

export let LOS = function (
    fov: IFieldOfView,
    chessArray: IChess[] | XYType[],
    visiblePoints?: number,
    reverse: boolean = false,
    originTileXY: XYType = fov.startTileXYZ,
    out: IChess[] | XYType[] = []
): IChess[] | XYType[] {

    chessArray.forEach(function (chess) {
        if (IsInLOS(fov, chess, visiblePoints, originTileXY) !== reverse) {
            out.push(chess);
        }
    })
    return out;
}