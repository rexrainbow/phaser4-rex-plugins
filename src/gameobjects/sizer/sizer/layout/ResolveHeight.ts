import { ISizer } from '../ISizer';
import { ResolveHeight as ResolveHeightBase } from '../../basesizer/layout/ResolveHeight';

export function ResolveHeight(
    sizer: ISizer,
    height?: number
): number {

    height = ResolveHeightBase(sizer, height);

    // Get proportionLength
    if ((sizer.proportionLength === undefined) && (sizer.orientation === 1)) {
        var remainder = height - sizer.childrenHeight;
        if (remainder > 0) {
            remainder = height - sizer.getChildrenHeight(false);
            sizer.proportionLength = remainder / sizer.childrenProportion;
        } else {
            sizer.proportionLength = 0;
            if (remainder < 0) {
                // Warning
            }
        }
    }

    return height;
}