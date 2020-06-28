import { IsPlainObject } from '../../../utils/object/IsPlainObject';

export let IsTileXYZ = function (obj: any): boolean {
    if (obj && (IsPlainObject(obj) || obj.isTileXYZ)) {
        return obj.hasOwnProperty('x') && obj.hasOwnProperty('y');
    } else {
        return false;
    }
}