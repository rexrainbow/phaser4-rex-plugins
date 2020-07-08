import { IFieldOfView } from './IFieldOfView';
import { XYType } from '../types';
import { TileXY, Blocker } from '../board';
import { XYToKey } from '../utils/StringKey';

export let PreTest = function (
    fov: IFieldOfView,
    tileXYArray: XYType[],
    visiblePoints?: number
): boolean {
    let board = fov.board;
    if (!board) {
        return false;
    }

    let costCahce = fov.costCache;
    if (fov.occupiedTest || fov.blockerTest || fov.edgeBlockerTest) {
        let tileZ = fov.startTileXYZ.z;
        for (let i = 1, cnt = tileXYArray.length; i < cnt; i++) {
            let tileXY = tileXYArray[i];
            let tileX = tileXY.x,
                tileY = tileXY.y;

            let key = XYToKey(tileX, tileY);
            if (costCahce.get(key) != null) {
                // console.log(`PreTest: ${key} in costCahe`);
                continue;
            }

            // Occupied test
            if (fov.occupiedTest &&
                TileXY.Contains(board, tileX, tileY, tileZ)
            ) {

                return false;
            }
            // Blocker test
            if (fov.blockerTest &&
                Blocker.HasBlocker(board, tileX, tileY)) {

                return false;
            }
            // Edge-blocker test
            if (fov.edgeBlockerTest) {
                // TODO
            }
        }
    }

    if (fov.preTestCallback) {
        if (fov.preTestCallbackScope) {
            return fov.preTestCallback.call(fov.preTestCallbackScope, tileXYArray, visiblePoints, fov);
        } else {
            return fov.preTestCallback(tileXYArray, visiblePoints, fov);
        }
    }

    return true;
}