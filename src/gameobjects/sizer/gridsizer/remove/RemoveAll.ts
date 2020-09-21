import {Remove as BaseRemove} from '../.././../container/remove/Remove';
import { ISizer } from '../IGridSizer';
import { Fill } from '../../../../utils/array/Fill';

export function RemoveAll(
    sizer: ISizer,
    destroyChild: boolean = true
) {

    BaseRemove(sizer, sizer.sizerChildren, destroyChild);

    // Clean up sizer children
    Fill(sizer.sizerChildren, null);
}