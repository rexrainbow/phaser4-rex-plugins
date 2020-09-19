import { ISizer } from "../IGridSizer";
import { GetChildAt } from './GetChildAt';

export function ForEachEmptyGrid(
    sizer: ISizer,
    callback: (columnIndex: number, rowIndex: number, sizer?: ISizer) => any,
    scope?: unknown
) {

    for (let r = 0, rcnt = sizer.rowCount; r < rcnt; r++) {
        for (let c = 0, ccnt = sizer.columnCount; c < ccnt; c++) {
            if (GetChildAt(sizer, c, r)) {
                continue;
            }

            let isBreak: boolean;
            if (scope) {
                isBreak = callback.call(scope, c, r, sizer);
            } else {
                isBreak = callback(c, r, sizer);
            }
            if (isBreak) {
                return;
            }
        }
    }
}