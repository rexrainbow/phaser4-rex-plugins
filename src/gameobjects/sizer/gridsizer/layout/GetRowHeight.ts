import { ISizer } from '../IGridSizer';

export function GetRowHeight(
    sizer: ISizer,
    rowIndex: number
): number {

    const rowProportion = sizer.rowProportions[rowIndex];
    const rowHeight = (rowProportion === 0) ? sizer.rowHeight[rowIndex] : (rowProportion * sizer.proportionHeightLength);
    return rowHeight;
}