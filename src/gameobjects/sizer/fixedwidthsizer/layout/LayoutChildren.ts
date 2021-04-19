import { ISizer, ISizerState, AlignMode } from '../IFixedWidthSizer';
import { AlignZone } from '../../util/AlignZone';
import { AlignPositionMode } from '../../../../utils/types/AlignPositionMode';

export function LayoutChildren(
    sizer: ISizer
) {

    const innerLineWidth = this.innerWidth;
    const startX = sizer.innerLeft;
    const startY = sizer.innerTop;
    let itemX = startX,
        itemY = startY;
    // Layout each line
    const lines = sizer.widthWrapResult.lines;
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
                itemX += remainderLineWidth;
                break;
            case AlignMode.center:
                itemX += remainderLineWidth / 2;
                break;
            case AlignMode['justify-left']:
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                break;
            case AlignMode['justify-right']:
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align right
                    itemX += remainderLineWidth;
                }
                break;
            case AlignMode['justify-center']:
                justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, lineChlidren.length);
                if (justifySpace === 0) {
                    // Align center
                    itemX += remainderLineWidth / 2;
                }
                break;
        }


        for (var j = 0, jcnt = lineChlidren.length; j < jcnt; j++) {
            const child = lineChlidren[j];
            const childSizerState = child.rexSizer as ISizerState;
            const padding = childSizerState.padding;
            let x: number, y: number, width: number, height: number;
            x = (itemX + padding.left);
            if (j > 0) {
                x += sizer.space.item;
            }

            y = (itemY + padding.top);
            width = child.width;
            height = child.height;
            itemX = x + width + padding.right + justifySpace;

            AlignZone
                .setTo(x, y, width, height)
                .alignIn(child, AlignPositionMode.center);
        }

        itemX = startX;
        itemY += line.height + sizer.space.line;
    }
}

function GetJustifySpace(
    total: number,
    remainder: number,
    childCount: number
): number {

    return ((remainder / total) <= 0.25) ? (remainder / (childCount - 1)) : 0;
}
