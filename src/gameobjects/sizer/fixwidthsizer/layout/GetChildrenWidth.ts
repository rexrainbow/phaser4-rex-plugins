import { ISizer } from '../IFixedWidthSizer';
import { OrientationMode } from '../../util/OrientationMode';

export function GetChildrenWidth(
    sizer: ISizer
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    let result: number;
    if (sizer.orientation === OrientationMode.x) { // x
        result = sizer.maxChildWidth;
    } else { // y
        result = 0;
    }
    return result + sizer.space.left + sizer.space.right;
}