import { Clear as BaseClear } from '../../../container/remove/Clear';
import { ISizer } from '../IFixedWidthSizer';

export function Clear(
    sizer: ISizer,
    destroyChild: boolean = true
) {

    BaseClear(sizer, destroyChild);

    // Clean up sizer children
    sizer.sizerChildren.length = 0;
    if (sizer.backgroundChildren) {
        sizer.backgroundChildren.length = 0;
    }
}