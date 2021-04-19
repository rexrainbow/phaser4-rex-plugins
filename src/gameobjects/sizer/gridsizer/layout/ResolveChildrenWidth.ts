import { ISizer } from '../IGridSizer';
import { BaseSizer } from '../../basesizer';
import { GetColumnWidth } from './GetColumnWidth';

export function ResolveChildrenWidth(
    sizer: ISizer,
    width: number
): void {

    // Resolve width of sizer children
    for (const i in sizer.sizerChildren) {
        const child = sizer.sizerChildren[i];
        if (!child) {
            continue;
        }

        const colWidth = GetColumnWidth(sizer, parseInt(i) % sizer.columnCount);
        if (child instanceof BaseSizer) {
            let childWidth = sizer.getExpandedChildWidth(child, colWidth);
            childWidth = child.resolveWidth(childWidth);
            child.resolveChildrenWidth(childWidth);
        }
    }
}