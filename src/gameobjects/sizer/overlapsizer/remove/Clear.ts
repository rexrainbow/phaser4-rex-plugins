import { Clear as BaseClear } from '../../../container/remove/Clear';
import { ISizer } from '../IOverlapSizer';

export function Clear(
    sizer: ISizer,
    destroyChild: boolean = true
) {

    BaseClear(sizer, destroyChild);

    // Clean up sizer children
    sizer.sizerChildren.clear();
    if (sizer.backgroundChildren) {
        sizer.backgroundChildren.length = 0;
    }
}