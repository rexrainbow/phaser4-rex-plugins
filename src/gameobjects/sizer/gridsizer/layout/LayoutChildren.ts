import { ISizer, ISizerState } from '../IGridSizer';
import { BaseSizer } from '../../basesizer';
import { ResizeGameObject } from '../../../../utils/size/ResizeGameObject';
import { AlignZone } from '../../util/AlignZone';
import { GetChildAt } from '../child/GetChildAt';

export function LayoutChildren(
    sizer: ISizer
) {

    const startX = sizer.innerLeft;
    const startY = sizer.innerTop;
    const columnSpace = sizer.space.column;
    const rowSpace = sizer.space.row;
    let itemX = startX,
        itemY = startY;
    for (let rowIndex = 0; rowIndex < sizer.rowCount; rowIndex++) {
        const rowProportion = sizer.rowProportions[rowIndex];
        const rowHeight = (rowProportion === 0) ? sizer.rowHeight[rowIndex] : (rowProportion * sizer.proportionHeightLength);

        itemX = startX;
        for (var columnIndex = 0; columnIndex < sizer.columnCount; columnIndex++) {
            const colProportion = sizer.columnProportions[columnIndex];
            const colWidth = (colProportion === 0) ? sizer.columnWidth[columnIndex] : (colProportion * sizer.proportionWidthLength);

            const child = GetChildAt(sizer, columnIndex, rowIndex);
            if ((!child) || (child.rexSizer.hidden)) {
                itemX += (colWidth + columnSpace[columnIndex]);
                continue;
            }

            const childWidth = sizer.getExpandedChildWidth(child, colWidth);
            const childHeight = sizer.getExpandedChildHeight(child, rowHeight);
            if (child instanceof BaseSizer) {
                child.runLayout(sizer, childWidth, childHeight);
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
}