import { ISizer } from '../IOverlapSizer';
import { BaseSizer } from '../../basesizer';

export function GetChildrenWidth(
    sizer: ISizer
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    let result = 0;
    for (const [key, child] of sizer.sizerChildren) {
        let childWidth = (child instanceof BaseSizer) ?
            Math.max(child.minWidth, child.childrenWidth) :
            child.width;

        const padding = child.rexSizer.padding;
        childWidth += (padding.left + padding.right);
        result = Math.max(childWidth, result);
    }

    return result + sizer.space.left + sizer.space.right;
}