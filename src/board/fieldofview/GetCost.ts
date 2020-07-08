import { IFieldOfView, CostValueType, BLOCKER } from './IFieldOfView';
import { XYType } from '../types';
import { XYToKey } from '../utils/StringKey';

export let GetCost = function (
    fov: IFieldOfView,
    currTileXY: XYType,
    lineTileXYArray: XYType[]
): CostValueType {

    let cost: CostValueType;
    let key = XYToKey(currTileXY.x, currTileXY.y);
    let costCahce = fov.costCache;

    if (costCahce.has(key)) {
        cost = costCahce.get(key);
        // console.log(`GetCost: ${key} in costCahe`);
    } else {

        let callback = fov.costCallback;
        if (callback) {
            let scope = fov.costCallbackScope;
            if (scope) {
                cost = callback.call(scope, currTileXY, fov, lineTileXYArray);
            } else {
                cost = callback(currTileXY, fov, lineTileXYArray);
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