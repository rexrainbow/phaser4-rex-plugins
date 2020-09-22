import { Remove as BaseRemove } from '../../../container/remove/Remove';
import { ISizer } from '../IOverlapSizer';
import { IChild } from '../../util/IChild';
import { GetChildKey } from '../child/GetChildKey';
import { Remove as RemoveItem } from '../../../../utils/array/Remove';

export function Remove(
    sizer: ISizer,
    child: IChild,
    destroyChild: boolean = true
) {

    BaseRemove(sizer, child, destroyChild);

    // Remove child from sizer children
    const key = GetChildKey(sizer, child);
    if (key) {
        sizer.sizerChildren.delete(key);
    } else {
        RemoveItem(sizer.backgroundChildren, child);
    }
}