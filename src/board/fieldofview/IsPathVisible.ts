import {
    IFieldOfView,
    BLOCKER
} from './IFieldOfView';
import { XYType } from '../Types';
import { GetCost } from './GetCost';

export function IsPathVisible(
    fov: IFieldOfView,
    tileXYArray: XYType[],
    visiblePoints?: number
): boolean {

    let behindBlocker = false;
    for (let i = 1, cnt = tileXYArray.length; i < cnt; i++) {
        let tileXY = tileXYArray[i];
        if (behindBlocker) {
            return false;
        }

        let cost = GetCost(fov, tileXY, tileXYArray);
        if (cost === BLOCKER) {
            behindBlocker = true;
            continue;
        }

        if (visiblePoints !== undefined) {
            visiblePoints -= cost;
            if (visiblePoints < 0) {
                return false;
            }
        }
    }
    return true;
}