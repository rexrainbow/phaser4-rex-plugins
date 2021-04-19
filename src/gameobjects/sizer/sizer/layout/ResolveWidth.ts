import { ISizer } from '../ISizer';
import { ResolveWidth as ResolveWidthBase } from '../../basesizer/layout/ResolveWidth';


export function ResolveWidth(
    sizer: ISizer,
    width?: number
): number {

    width = ResolveWidthBase(sizer, width);

    // Calculate proportionLength
    if ((sizer.proportionLength === undefined) && (sizer.orientation === 0)) {
        var remainder = width - sizer.childrenWidth;
        if (remainder > 0) {
            remainder = width - sizer.getChildrenWidth(false);
            sizer.proportionLength = remainder / sizer.childrenProportion;
        } else {
            sizer.proportionLength = 0;
            if (remainder < 0) {
                // Warning
            }
        }
    }

    return width;
}