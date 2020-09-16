import { ISizer, ISizerState } from '../ISizer';

export function GetChildrenProportion(
    sizer: ISizer
): number {

    const children = sizer.sizerChildren;
    let result = 0;
    for (let i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child.rexSizer.hidden) {
            continue;
        }
        const childSizerState = child.rexSizer as ISizerState;
        const proportion = childSizerState.proportion;
        if (proportion > 0) {
            result += proportion;
        }
    }
    return result;
}