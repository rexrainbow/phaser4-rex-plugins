import { ISizer, IConfig } from './IGridSizer';
import { Fill } from '../../../utils/array/Fill';

export function Init(
    sizer: ISizer,
    {
        column = 0,
        row = 0,
        columnProportions = 0,
        rowProportions = 0,
        space
    }: IConfig = {}
) {

    sizer.columnCount = column;
    sizer.rowCount = row;

    // sizer children
    sizer.grids.length = column * row;
    Fill(sizer.grids, null);

    // proportions
    sizer.columnProportions.length = column;
    if (typeof (columnProportions) === 'number') {
        Fill(sizer.columnProportions, columnProportions);
    } else {
        for (let i = 0; i < column; i++) {
            sizer.columnProportions[i] = columnProportions[i] ?? 0;
        }
    }
    sizer.rowProportions.length = row;
    if (typeof (rowProportions) === 'number') {
        Fill(sizer.rowProportions, rowProportions);
    } else {
        for (let i = 0; i < row; i++) {
            sizer.rowProportions[i] = rowProportions[i] ?? 0;
        }
    }

    // width & height
    sizer.columnWidth.length = column;
    sizer.rowHeight.length = row;

    // space
    sizer.space.column = [] as number[];
    sizer.space.column.length = column - 1;
    const columnSpace = space.column ?? 0;
    if (typeof (columnSpace) === 'number') {
        Fill(sizer.space.column, columnSpace);
    } else {
        for (let i = 0, cnt = sizer.space.column.length; i < cnt; i++) {
            sizer.space.column[i] = columnSpace[i] ?? 0;
        }
    }
    sizer.space.row = [] as number[];
    sizer.space.row.length = row - 1;
    const rowSpace = space.row ?? 0;
    if (typeof (rowSpace) === 'number') {
        Fill(sizer.space.row, rowSpace);
    } else {
        for (let i = 0, cnt = sizer.space.row.length; i < cnt; i++) {
            sizer.space.row[i] = rowSpace[i] ?? 0;
        }
    }
}