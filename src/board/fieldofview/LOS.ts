import { IFieldOfView } from './IFieldOfView';
import { IChess, XYType } from '../types';
import { IsInLOS } from './IsInLOS';

export let LOS = function (
    fov: IFieldOfView,
    chessArray: IChess[] | XYType[] | IChess | XYType,
    visiblePoints: number | undefined,
    originTileXY: XYType = fov.startTileXYZ,
    out?: IChess[] | XYType[]
): IChess[] | XYType[] | boolean {

    if (!Array.isArray(chessArray)) {
        let chess = chessArray;
        return IsInLOS(fov, chess, visiblePoints, originTileXY);
    } else {
        if (out === undefined) {
            out = [];
        }

        let chess : IChess | XYType;
        for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
            chess = chessArray[i];
            if (!IsInLOS(fov, chess, visiblePoints, originTileXY)) {
                continue;
            }
            out.push(chess)
        }
        return out;
    }
}