import { ISizer } from '../IGridSizer';
import { ResolveWidth as ResolveWidthBase } from '../../basesizer/layout/ResolveWidth';

export function ResolveWidth(
    sizer: ISizer,
    width?: number
): number {

    width = ResolveWidthBase(sizer, width);

    // Get proportionLength
    if (sizer.proportionWidthLength === undefined) {
        const totalColumnProportions = sizer.totalColumnProportions;
        if (totalColumnProportions > 0) {
            const remainder = width - sizer.childrenWidth;
            if (remainder >= 0) {
                sizer.proportionWidthLength = remainder / totalColumnProportions;
            } else {
                // Warning
            }
        } else {
            sizer.proportionWidthLength = 0;
        }
    }

    return width;
}