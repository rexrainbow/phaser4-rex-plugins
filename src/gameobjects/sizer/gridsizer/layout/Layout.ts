import { ISizer, ISizerState } from '../IGridSizer';
import { IBaseSizer } from '../../basesizer/IBaseSizer';
import { BaseSizer } from '../../basesizer';
import { GetExpandedChildWidth } from './GetExpandedChildWidth';
import { GetExpandedChildHeight } from './GetExpandedChildHeight';
import { ResizeGameObject } from '../../../../utils/size/ResizeGameObject';
import { AlignZone } from '../../util/AlignZone';

export function Layout(
    sizer: ISizer,
    parent?: IBaseSizer,
    minWidth?: number,
    minHeight?: number
) {

    // Skip hidden or !dirty sizer
    if (sizer.rexSizer.hidden || (!sizer.needLayout)) {
        return;
    }

    sizer.preLayout(parent);

    const totalColumnProportions = sizer.totalColumnProportions;
    const totalRowProportions = sizer.totalRowProportions;

    // Set size
    if (minWidth === undefined) {
        if (parent && (totalColumnProportions > 0)) { // Expand to parent width
            const padding = sizer.rexSizer.padding;
            minWidth = parent.width - padding.left - padding.right;
        } else {
            minWidth = Math.max(sizer.childrenWidth, sizer.minWidth);
        }
    }
    if (minHeight === undefined) {
        if (parent && (totalRowProportions > 0)) { // Expand to parent height
            const padding = sizer.rexSizer.padding;
            minHeight = parent.height - padding.top - padding.bottom;
        } else {
            minHeight = Math.max(sizer.childrenHeight, sizer.minHeight);
        }
    }
    sizer.resize(minWidth, minHeight);

    let proportionWidthLength: number;
    if (totalColumnProportions > 0) {
        proportionWidthLength = (sizer.width - sizer.childrenWidth) / totalColumnProportions;
    } else {
        proportionWidthLength = 0;
    }
    let proportionHeightLength: number;
    if (totalRowProportions > 0) {
        proportionHeightLength = (sizer.height - sizer.childrenHeight) / totalRowProportions;
    } else {
        proportionHeightLength = 0;
    }

    const startX = sizer.innerLeft;
    const startY = sizer.innerTop;
    const columnSpace = sizer.space.column;
    const rowSpace = sizer.space.row;
    let itemX = startX,
        itemY = startY;
    for (let rowIndex = 0; rowIndex < sizer.rowCount; rowIndex++) {
        const rowProportion = sizer.rowProportions[rowIndex];
        const rowHeight = (rowProportion === 0) ? sizer.rowHeight[rowIndex] : (rowProportion * proportionHeightLength);

        itemX = startX;
        for (var columnIndex = 0; columnIndex < sizer.columnCount; columnIndex++) {
            const colProportion = sizer.columnProportions[columnIndex];
            const colWidth = (colProportion === 0) ? sizer.columnWidth[columnIndex] : (colProportion * proportionWidthLength);

            const child = sizer.getChildAt(columnIndex, rowIndex);
            if ((!child) || (child.rexSizer.hidden)) {
                itemX += (colWidth + columnSpace[columnIndex]);
                continue;
            }

            const childWidth = GetExpandedChildWidth(child, colWidth);
            const childHeight = GetExpandedChildHeight(child, rowHeight);
            if (child instanceof BaseSizer) {
                child._layout(sizer, childWidth, childHeight);
            } else {
                ResizeGameObject(child, childWidth, childHeight);
            }

            const childSizerState = child.rexSizer as ISizerState;
            const padding = childSizerState.padding;
            const x = (itemX + padding.left);
            const width = colWidth - padding.left - padding.right;
            const y = (itemY + padding.top);
            const height = rowHeight - padding.top - padding.bottom;

            AlignZone
                .setTo(x, y, width, height)
                .alignIn(child, childSizerState.align);

            itemX += (colWidth + columnSpace[columnIndex]);
        }

        itemY += (rowHeight + rowSpace[rowIndex]);
    }


    // Layout background children
    sizer.layoutBackgrounds();

    return sizer.postLayout();
}

export default Layout;