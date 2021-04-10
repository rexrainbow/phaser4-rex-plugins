import { ISizer } from '../IOverlapSizer';

export function GetChildrenWidth(
    sizer: ISizer
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    let result = 0;
    for (const [key, child] of sizer.sizerChildren) {
        const padding = child.rexSizer.padding;
        const childWidth = sizer.getChildWidth(child) + padding.left + padding.right;
        result = Math.max(childWidth, result);
    }

    return result + sizer.space.left + sizer.space.right;
}