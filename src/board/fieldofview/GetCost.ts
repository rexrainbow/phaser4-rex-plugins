import { IFieldOfView, CostValueType, BLOCKER } from './IFieldOfView';
import { XYType } from '../types';

export let GetCost = function (
    fov: IFieldOfView,
    currTileXY: XYType,
    lineTileXYArray: XYType[]
): CostValueType {

    let callback = fov.costCallback;
    if (callback) {
        let scope = fov.costCallbackScope;
        let cost: CostValueType;
        if (scope) {
            cost = callback.call(scope, currTileXY, fov, lineTileXYArray);
        } else {
            cost = callback(currTileXY, fov, lineTileXYArray);
        }
        if (cost === undefined) {
            cost = BLOCKER;
        }
        return cost;
    } else {
        return fov.constCost;
    }
}