import { ISizer } from '../IGridSizer';
import { Sum } from '../../../../utils/math/Sum';


export function GetChildrenHeight(
    sizer: ISizer
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    let result = 0;
    const children = sizer.sizerChildren;
    for (let i = 0; i < sizer.rowCount; i++) {
        const proportion = sizer.rowProportions[i];
        let rowHeight = 0;
        if (proportion === 0) {
            for (var j = 0; j < sizer.columnCount; j++) {
                const child = children[(i * sizer.columnCount) + j];
                if (!child) {
                    continue;
                }
                if (child.rexSizer.hidden) {
                    continue;
                }

                const padding = child.rexSizer.padding;
                const childHeight = sizer.getChildHeight(child) + padding.top + padding.bottom;
                rowHeight = Math.max(rowHeight, childHeight);
            }
            result += rowHeight;
        }
        sizer.rowHeight[i] = rowHeight;
    }
    return result + Sum(sizer.space.top, ...sizer.space.row, sizer.space.bottom);
}