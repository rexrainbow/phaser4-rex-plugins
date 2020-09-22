import { ISizer } from '../IOverlapSizer';
import { BaseSizer } from '../../basesizer';

export function GetChildrenHeight(
    sizer: ISizer
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    let result = 0;
    for (const [key, child] of sizer.sizerChildren) {
        let childHeight = (child instanceof BaseSizer) ?
            Math.max(child.minHeight, child.childrenHeight) :
            child.height;

        const padding = child.rexSizer.padding;
        childHeight += (padding.top + padding.bottom);
        result = Math.max(childHeight, result);
    }
    return result + sizer.space.top + sizer.space.bottom;
}