import { ISizer } from '../IGridSizer';
import { BaseSizer } from '../../basesizer';
import { Sum } from '../../../../utils/math/Sum';

export function GetChildrenWidth(
    sizer: ISizer
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    let result = 0;
    const children = sizer.sizerChildren;
    for (let i = 0; i < sizer.columnCount; i++) {
        const proportion = sizer.columnProportions[i];
        let columnWidth = 0;
        if (proportion === 0) {
            for (let j = 0; j < sizer.rowCount; j++) {
                const child = children[(j * sizer.columnCount) + i];
                if (!child) {
                    continue;
                }
                if (child.rexSizer.hidden) {
                    continue;
                }

                let childWidth = (child instanceof BaseSizer) ?
                    Math.max(child.minWidth, child.childrenWidth) :
                    child.width;
                const padding = child.rexSizer.padding;
                childWidth += (padding.left + padding.right);
                columnWidth = Math.max(columnWidth, childWidth);
            }
            result += columnWidth;
        }
        sizer.columnWidth[i] = columnWidth;
    }
    return result + Sum(sizer.space.left, ...sizer.space.column, sizer.space.right);
}