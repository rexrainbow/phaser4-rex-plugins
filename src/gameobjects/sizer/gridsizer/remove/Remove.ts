import { Remove as BaseRemove } from '../../../container/remove/Remove';
import { ISizer } from '../IGridSizer';
import { IChild } from '../../util/IChild';
import { Remove as RemoveItem } from '../../../../utils/array/Remove';

export function Remove(
    sizer: ISizer,
    child: IChild,
    destroyChild: boolean = true
) {

    BaseRemove(this, child, destroyChild);

    // Remove child from sizer children
    const index = sizer.sizerChildren.indexOf(child);
    if (index >= 0) {
        sizer.sizerChildren[index] = null;
    } else if (sizer.backgroundChildren) {
        RemoveItem(sizer.backgroundChildren, child);
    }
}