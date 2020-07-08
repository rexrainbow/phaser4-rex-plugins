import { IFieldOfView } from './IFieldOfView';
import { XYType } from '../types';
import { Ring } from '../board';
import { IsInLOS } from './IsInLOS';

export let FindFOV = function (
    fov: IFieldOfView,
    visiblePoints?: number,
    originTileXY: XYType = fov.startTileXYZ,
    out: XYType[] = []
): XYType[] {

    let board = fov.board;
    let isAnyVisible: boolean,
        radius = 1,
        ringTileXYArray: XYType[] = [],
        targetTileXY: XYType;
    do {
        isAnyVisible = false;
        ringTileXYArray.length = 0;
        Ring.RingToTileXYArray(board, originTileXY, radius, ringTileXYArray);
        for (let i = 0, cnt = ringTileXYArray.length; i < cnt; i++) {
            targetTileXY = ringTileXYArray[i];
            if (IsInLOS(fov, targetTileXY, visiblePoints, originTileXY)) {
                isAnyVisible = true;
                out.push(targetTileXY);
            }
        }
        radius++;
    } while (isAnyVisible)

    return out;
}