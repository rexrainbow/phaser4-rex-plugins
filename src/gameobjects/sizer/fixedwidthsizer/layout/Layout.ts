import { ISizer, ISizerState, AlignMode } from '../IFixedWidthSizer';
import { IBaseSizer } from '../../basesizer/IBaseSizer';
import { BaseSizer } from '../../basesizer';
import { OrientationMode } from '../../util/OrientationMode';
import { RunChildrenWrap, ResultType } from './RunChildrenWrap';
import { AlignZone } from '../../util/AlignZone';
import { AlignPositionMode } from '../../../../utils/types/AlignPositionMode';

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

    // Set size
    if (minWidth === undefined) {
        minWidth = Math.max(
            (sizer.maxChildWidth + sizer.space.left + sizer.space.right),
            sizer.minWidth
        );
    }
    if (minHeight === undefined) {
        minHeight = Math.max(
            (sizer.maxChildHeight + sizer.space.top + sizer.space.bottom),
            sizer.minHeight
        );
    }

    let innerLineWidth: number;
    if (sizer.orientation === OrientationMode.x) { // x
        innerLineWidth = minWidth - sizer.space.left - sizer.space.right;
    } else { // y
        innerLineWidth = minHeight - sizer.space.top - sizer.space.bottom;
    }
    const wrapResult = RunChildrenWrap(sizer, innerLineWidth);
    // Expanded height is less then min-lines-height
    if (sizer.orientation === OrientationMode.x) { // x
        minHeight = Math.max(
            minHeight,
            (wrapResult.height + sizer.space.top + sizer.space.bottom)
        );
    } else { // y
        minWidth = Math.max(
            minWidth,
            (wrapResult.height + sizer.space.left + sizer.space.right)
        );
    }
    sizer.resize(minWidth, minHeight);

    // Layout children
    const startX = sizer.innerLeft;
    const startY = sizer.innerTop;
    let itemX = startX,
        itemY = startY;
    // Layout each line
    const lines = wrapResult.lines;
    for (let i = 0, icnt = lines.length; i < icnt; i++) {
        const line = lines[i];
        const lineChlidren = line.children;

        if (sizer.rtl) {
            lineChlidren.reverse();
        }

        const remainderLineWidth = (innerLineWidth - line.width);
        let justifySpace = 0;
        switch (sizer.align) {
            case AlignMode.left:
                break;
            case AlignMode.right:
                if (sizer.orientation === OrientationMode.x) {
                    itemX += remainderLineWidth;
                } else {
                    itemY += remainderLineWidth;
                }
                break;
            case AlignMode.center:
                if (sizer.orientation === OrientationMode.x) {
                    itemX += remainderLineWidth / 2;
                } else {
                    itemY += remainderLineWidth / 2;
                }
                break;
            case AlignMode['justify-left']:
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                break;
            case AlignMode['justify-right']:
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align right
                    if (sizer.orientation === OrientationMode.x) {
                        itemX += remainderLineWidth;
                    } else {
                        itemY += remainderLineWidth;
                    }
                }
                break;
            case AlignMode['justify-center']:
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align center
                    if (sizer.orientation === OrientationMode.x) {
                        itemX += remainderLineWidth / 2;
                    } else {
                        itemY += remainderLineWidth / 2;
                    }
                }
                break;
        }


        for (var j = 0, jcnt = lineChlidren.length; j < jcnt; j++) {
            const child = lineChlidren[j];
            const childSizerState = child.rexSizer as ISizerState;
            const padding = childSizerState.padding;
            let x: number, y: number, width: number, height: number;
            if (sizer.orientation === OrientationMode.x) { // x
                x = (itemX + padding.left);
                if (j > 0) {
                    x += sizer.space.item;
                }

                y = (itemY + padding.top);
                width = child.width;
                height = child.height;
                itemX = x + width + padding.right + justifySpace;
            } else { // y
                x = (itemX + padding.left);

                y = (itemY + padding.top);
                if (j > 0) {
                    y += sizer.space.item;
                }

                width = child.width;
                height = child.height;
                itemY = y + height + padding.bottom + justifySpace;
            }

            AlignZone
                .setTo(x, y, width, height)
                .alignIn(child, AlignPositionMode.CENTER);
        }

        if (sizer.orientation === OrientationMode.x) {
            itemX = startX;
            itemY += line.height + sizer.space.line;
        } else { // y
            itemX += line.height + sizer.space.line;
            itemY = startY;
        }
    }

    // Layout background children
    sizer.layoutBackgrounds();

    sizer.postLayout();
}

function GetJustifySpace(
    total: number,
    remainder: number,
    childCount: number
): number {

    return ((remainder / total) <= 0.25) ? (remainder / (childCount - 1)) : 0;
}

export default Layout;