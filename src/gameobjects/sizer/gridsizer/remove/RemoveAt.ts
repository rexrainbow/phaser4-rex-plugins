import { ISizer } from '../IGridSizer';
import { GetChildAt } from '../child/GetChildAt';
import { Remove } from './Remove';

export function RemoveAt(
    sizer: ISizer,
    columnIndex: number,
    rowIndex: number,
    destroyChild: boolean = true
) {

    const child = GetChildAt(sizer, columnIndex, rowIndex);
    if (child) {
        Remove(sizer, child, destroyChild);
    }
}