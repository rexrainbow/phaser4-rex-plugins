import { IBaseSizer } from '../IBaseSizer';
import { BaseSizer } from '../BaseSizer';

export function ResolveChildrenWidth(
    sizer: IBaseSizer,
    width?: number
) {

    // Resolve width of sizer children
    for (const i in sizer.sizerChildren) {
        const child = sizer.sizerChildren[i];
        if (child && (child instanceof BaseSizer) && !child.ignoreLayout) {
            let childWidth = sizer.getExpandedChildWidth(child, width);
            childWidth = child.resolveWidth(childWidth);
            child.resolveChildrenWidth(childWidth);
        }
    }
}