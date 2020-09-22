import { ISizer, ISizerState } from '../IOverlapSizer';
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

    // Set size
    if (minWidth === undefined) {
        minWidth = Math.max(sizer.childrenWidth, sizer.minWidth);
    }
    if (minHeight === undefined) {
        minHeight = Math.max(sizer.childrenHeight, sizer.minHeight);
    }
    sizer.resize(minWidth, minHeight);

    // Layout children
    const startX = sizer.innerLeft;
    const startY = sizer.innerTop;
    const innerWidth = sizer.innerWidth;
    const innerHeight = sizer.innerHeight;
    for (let [key, child] of sizer.sizerChildren) {
        const childSizerState = child.rexSizer as ISizerState;
        const padding = childSizerState.padding;

        // Set size
        if (child instanceof BaseSizer) {
            child._layout(
                sizer,
                GetExpandedChildWidth(sizer, child),
                GetExpandedChildHeight(sizer, child)
            );
        } else {
            let childWidth: number;
            let childHeight: number;
            if (childSizerState.expandWidth) { // Expand width
                childWidth = innerWidth - padding.left - padding.right;
            }
            if (childSizerState.expandHeight) { // Expand height
                childHeight = innerHeight - padding.top - padding.bottom;
            }
            ResizeGameObject(child, childWidth, childHeight);
        }

        // Set position
        const x = (startX + padding.left);
        const width = innerWidth - padding.left - padding.right;
        const y = (startY + padding.top);
        const height = innerHeight - padding.top - padding.bottom;

        AlignZone
            .setTo(x, y, width, height)
            .alignIn(child, childSizerState.align);
    }

    // Layout background children
    sizer.layoutBackgrounds();

    sizer.postLayout();
}