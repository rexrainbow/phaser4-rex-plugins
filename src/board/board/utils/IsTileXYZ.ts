import { IsPlainObject } from '../../../utils/object/IsPlainObject';

export let IsTileXYZ = function (obj: any): boolean {
    return obj &&
        (IsPlainObject(obj) || obj.isTileXYZ);
}