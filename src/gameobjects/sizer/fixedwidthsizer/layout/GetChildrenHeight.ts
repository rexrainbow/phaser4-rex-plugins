import { ISizer } from '../IFixedWidthSizer';
import { OrientationMode } from '../../util/OrientationMode';

export function GetChildrenHeight(
    sizer: ISizer
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    let result: number;
    if (sizer.orientation === OrientationMode.x) { // x
        result = 0;
    } else { // y
        result = sizer.maxChildHeight;
    }
    return result + sizer.space.top + sizer.space.bottom;
}