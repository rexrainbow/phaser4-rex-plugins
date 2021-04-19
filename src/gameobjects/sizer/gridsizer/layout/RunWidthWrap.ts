import { ISizer } from '../IGridSizer';
import { GetColumnWidth } from './GetColumnWidth';

// Default method
export function RunWidthWrap(
    sizer: ISizer,
    width: number
) {

    for (const i in this.sizerChildren) {
        const child = this.sizerChildren[i];
        if (!child) {
            continue;
        }

        const colWidth = GetColumnWidth(sizer, parseInt(i) % sizer.columnCount);
        let childWidth = sizer.getExpandedChildWidth(child, colWidth);
        if (childWidth === undefined) {
            childWidth = sizer.resolveWidth();
        }
        if (child.runWidthWrap) {
            child.runWidthWrap(childWidth);
        }
    }
}