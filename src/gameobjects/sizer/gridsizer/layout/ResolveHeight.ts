import { ISizer } from '../IGridSizer';
import { ResolveHeight as ResolveHeightBase } from '../../basesizer/layout/ResolveHeight';

export function ResolveHeight(
    sizer: ISizer,
    height?: number
): number {

    height = ResolveHeightBase(sizer, height);

    // Get proportionLength    
    if (sizer.proportionHeightLength === undefined) {
        const totalRowProportions = sizer.totalRowProportions;
        if (totalRowProportions > 0) {
            const remainder = height - sizer.childrenHeight;
            if (remainder >= 0) {
                sizer.proportionHeightLength = remainder / totalRowProportions;
            } else {
                // Warning
            }
        } else {
            sizer.proportionHeightLength = 0;
        }
    }

    return height;
}

export default ResolveHeight;