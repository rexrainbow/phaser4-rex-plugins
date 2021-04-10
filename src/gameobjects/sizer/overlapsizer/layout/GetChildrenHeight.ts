import { ISizer } from '../IOverlapSizer';

export function GetChildrenHeight(
    sizer: ISizer
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    let result = 0;
    for (const [key, child] of sizer.sizerChildren) {
        const padding = child.rexSizer.padding;
        const childHeight = sizer.getChildHeight(child) + padding.top + padding.bottom;
        result = Math.max(childHeight, result);
    }
    return result + sizer.space.top + sizer.space.bottom;
}