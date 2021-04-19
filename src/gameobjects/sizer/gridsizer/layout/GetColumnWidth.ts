import { ISizer } from '../IGridSizer';

export function GetColumnWidth(
    sizer: ISizer,
    columnIndex: number
): number {

    const colProportion = sizer.columnProportions[columnIndex];
    const colWidth = (colProportion === 0) ? sizer.columnWidth[columnIndex] : (colProportion * sizer.proportionWidthLength);
    return colWidth;
}