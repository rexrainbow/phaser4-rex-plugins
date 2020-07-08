import { IsPlainObject } from '../../utils/object/IsPlainObject';

export let IsTileXYZ = function (obj: any): boolean {
    if (IsPlainObject(obj)) {
        return true;
    } else if (typeof (obj) === 'object') {
        return obj.isTileXYZ;
    } else {
        return false;
    }
}