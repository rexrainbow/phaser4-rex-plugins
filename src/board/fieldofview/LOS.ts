import { IFieldOfView } from './IFieldOfView';
import { IChess, XYType } from '../Types';
import { IsInLOS } from './IsInLOS';

export function LOS(
    fov: IFieldOfView,
    chessArray: IChess[] | XYType[],
    visiblePoints?: number,
    inverse: boolean = false,
    originTileXY: XYType = fov.startTileXYZ,
    out: IChess[] | XYType[] = []
): IChess[] | XYType[] {

    chessArray.forEach(function (chess) {
        if (IsInLOS(fov, chess, visiblePoints, originTileXY) !== inverse) {
            out.push(chess);
        }
    })
    return out;
}