import { IFieldOfView, CostValueType, BLOCKER } from './IFieldOfView';
import { TileXY, Blocker } from '../board';
import { XYType } from '../Types';
import { XYToKey } from '../utils/StringKey';

export function GetCost(
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

        if (fov.occupiedTest &&  // Occupied test
            TileXY.Contains(board, tileX, tileY, tileZ)
        ) {

            cost = BLOCKER;
        } else if (fov.blockerTest &&  // Blocker test
            Blocker.HasBlocker(board, tileX, tileY)) {

            cost = BLOCKER;
        } else if (fov.edgeBlockerTest && // Edge-blocker test
            false) {
            // TODO
            cost = BLOCKER;
        } else {
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
        }

        costCahce.set(key, cost);
    }

    return cost;
}