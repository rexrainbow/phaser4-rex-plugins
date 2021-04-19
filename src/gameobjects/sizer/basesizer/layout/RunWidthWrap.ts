import { IBaseSizer } from '../IBaseSizer';
import { BaseSizer } from '../BaseSizer';

// Default method
export function RunWidthWrap(
    sizer: IBaseSizer,
    width: number
) {

    for (let i in sizer.sizerChildren) {
        let child = sizer.sizerChildren[i];
        if (
            (!child) ||
            (child instanceof BaseSizer && child.ignoreLayout)
        ) {
            continue;
        }

        let childWidth = sizer.getExpandedChildWidth(child, width);
        if (childWidth === undefined) {
            childWidth = sizer.resolveWidth();
        }
        if (child.runWidthWrap) {
            child.runWidthWrap(childWidth);
        }
    }
}