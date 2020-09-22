import { Remove as BaseRemove } from '../../../container/remove/Remove';
import { ISizer } from '../IFixedWidthSizer';
import { IChild } from '../../util/IChild';
import { Remove as RemoveItem } from '../../../../utils/array/Remove';

export function Remove(
    sizer: ISizer,
    child: IChild,
    destroyChild: boolean = true
) {

    BaseRemove(this, child, destroyChild);

    // Remove child from sizer children
    const result = RemoveItem(sizer.sizerChildren, child);
    if ((!result) && sizer.backgroundChildren) {
        RemoveItem(sizer.backgroundChildren, child);
    }
}