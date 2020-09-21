import { Clear as BaseClear } from '../../../container/remove/Clear';
import { ISizer } from '../IGridSizer';
import { Fill } from '../../../../utils/array/Fill';

export function Clear(
    sizer: ISizer,
    destroyChild: boolean = true
) {

    BaseClear(sizer, destroyChild);

    // Clean up sizer children
    Fill(sizer.sizerChildren, null);
    if (sizer.backgroundChildren) {
        sizer.backgroundChildren.length = 0;
    }
}