import {Remove as BaseRemove} from '../.././../container/remove/Remove';
import { ISizer } from '../ISizer';

export function RemoveAll(
    sizer: ISizer,
    destroyChild: boolean = true
) {

    BaseRemove(sizer, sizer.sizerChildren, destroyChild);

    // Clean up sizer children
    sizer.sizerChildren.length = 0;
}