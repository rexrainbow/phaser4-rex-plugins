import { IFieldOfView, CostValueType, BLOCKER } from './IFieldOfView';
import { TileXY, Blocker } from '../board';
import { XYType } from '../types';
import { XYToKey } from '../utils/StringKey';

export let GetCost = function (
    fov: IFieldOfView,
    tileXY: XYType,
    lineTileXYArray: XYType[]
): CostValueType {

    let cost: CostValueType;
    let key = XYToKey(tileXY.x, tileXY.y);
    let costCahce = fov.costCache;

    if (costCahce.has(key)) {
        cost = costCahce.get(key);
        // console.log(`GetCost: ${key} in costCahe`);
    } else {
        let board = fov.board;
        let tileX = tileXY.x,
            tileY = tileXY.y,
            tileZ = fov.startTileXYZ.z;
        // Occupied test
        if (fov.occupiedTest &&
            TileXY.Contains(board, tileX, tileY, tileZ)
        ) {

            return BLOCKER;
        }
        // Blocker test
        if (fov.blockerTest &&
            Blocker.HasBlocker(board, tileX, tileY)) {

            return BLOCKER;
        }
        // Edge-blocker test
        if (fov.edgeBlockerTest) {
            // TODO
        }

        let callback = fov.costCallback;
        if (callback) {
            let scope = fov.costCallbackScope;
            if (scope) {
                cost = callback.call(scope, tileXY, fov, lineTileXYArray);
            } else {
                cost = callback(tileXY, fov, lineTileXYArray);
            }
            if (cost === undefined) {
                cost = BLOCKER;
            }
        } else {
            cost = fov.constCost;
        }

        costCahce.set(key, cost);
    }

    return cost;
}