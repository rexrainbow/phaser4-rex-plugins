import { ISizer } from '../IGridSizer';

export function GetEmptyGridCount(
    sizer: ISizer
): number {

    const children = sizer.sizerChildren;
    let emptyGridCount = 0;
    for (let i = 0, cnt = children.length; i < cnt; i++) {
        if (!children[i]) {
            emptyGridCount++;
        }
    }
    return emptyGridCount;
}