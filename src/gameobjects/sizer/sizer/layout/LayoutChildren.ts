import { ISizer, ISizerState } from '../ISizer';
import { BaseSizer } from '../../basesizer';
import { OrientationMode } from '../../util/OrientationMode';
import { ResizeGameObject } from '../../../../utils/size/ResizeGameObject';
import { AlignZone } from '../../util/AlignZone';

export function LayoutChildren(
    sizer: ISizer
) {

    const children = sizer.sizerChildren;
    const startX = sizer.innerLeft;
    const startY = sizer.innerTop;
    const innerWidth = sizer.innerWidth;
    const innerHeight = sizer.innerHeight;
    let itemX = startX,
        itemY = startY;
    for (let i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child.rexSizer.hidden) {
            continue;
        }

        const childSizerState = child.rexSizer as ISizerState;
        const padding = childSizerState.padding;

        // Set size
        let childWidth = sizer.getExpandedChildWidth(child);
        let childHeight = sizer.getExpandedChildHeight(child);
        if (child instanceof BaseSizer) {
            child.runLayout(sizer, childWidth, childHeight);
        } else {
            ResizeGameObject(child, childWidth, childHeight);
        }

        if (childWidth === undefined) {
            childWidth = child.width;
        }
        if (childHeight === undefined) {
            childHeight = child.height;
        }

        // Set position
        let x: number, y: number, width: number, height: number;
        if (sizer.orientation === OrientationMode.x) { // x
            x = (itemX + padding.left);
            if ((childSizerState.proportion === 0) || (sizer.proportionLength === 0)) {
                width = childWidth;
            } else {
                width = (childSizerState.proportion * sizer.proportionLength);
            }

            y = (itemY + padding.top);
            height = (innerHeight - padding.top - padding.bottom);
        } else { // y
            x = (itemX + padding.left);
            width = (innerWidth - padding.left - padding.right);

            y = (itemY + padding.top);
            if ((childSizerState.proportion === 0) || (sizer.proportionLength === 0)) {
                height = childHeight;
            } else {
                height = (childSizerState.proportion * sizer.proportionLength);
            }
        }

        AlignZone
            .setTo(x, y, width, height)
            .alignIn(child, childSizerState.align);

        if (sizer.orientation === OrientationMode.x) {
            itemX += (width + padding.left + padding.right + sizer.space.item);
        } else { // y
            itemY += (height + padding.top + padding.bottom + sizer.space.item);
        }
    }
}