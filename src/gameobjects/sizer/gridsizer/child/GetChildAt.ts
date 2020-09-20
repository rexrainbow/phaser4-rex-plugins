import { ISizer } from "../IGridSizer";
import { IChild } from '../../util/IChild';

export function GetChildAt(
    sizer: ISizer,
    columnIndex: number,
    rowIndex: number
): IChild {

    return sizer.grids[(rowIndex * sizer.columnCount) + columnIndex];
}