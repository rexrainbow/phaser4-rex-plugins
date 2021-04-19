import { ISizer, ISizerState } from '../IOverlapSizer';
import { BaseSizer } from '../../basesizer';
import { ResizeGameObject } from '../../../../utils/size/ResizeGameObject';
import { AlignZone } from '../../util/AlignZone';

export function LayoutChildren(
    sizer: ISizer
) {

    const startX = sizer.innerLeft;
    const startY = sizer.innerTop;
    const innerWidth = sizer.innerWidth;
    const innerHeight = sizer.innerHeight;
    for (let [key, child] of sizer.sizerChildren) {
        const childSizerState = child.rexSizer as ISizerState;
        const padding = childSizerState.padding;

        // Set size
        if (child instanceof BaseSizer) {
            child.runLayout(
                sizer,
                sizer.getExpandedChildWidth(child),
                sizer.getExpandedChildHeight(child)
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
}