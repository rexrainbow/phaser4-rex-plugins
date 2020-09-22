import { Remove as BaseRemove } from '../.././../container/remove/Remove';
import { ISizer } from '../IOverlapSizer';

export function RemoveAll(
    sizer: ISizer,
    destroyChild: boolean = true
) {

    BaseRemove(sizer, Array.from(sizer.sizerChildren.values()), destroyChild);

    // Clean up sizer children
    sizer.sizerChildren.clear();
}