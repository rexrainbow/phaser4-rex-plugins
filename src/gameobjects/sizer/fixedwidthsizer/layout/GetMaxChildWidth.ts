import { ISizer } from '../IFixedWidthSizer';
import { IChild } from '../../util/IChild';

export function GetMaxChildWidth(
    sizer: ISizer,
    children: (IChild | '\n')[] = sizer.sizerChildren
): number {

    let result = 0;
    for (let i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child === '\n') {
            continue;
        }

        const childWidth = sizer.getChildWidth(child);
        result = Math.max(childWidth, result);
    }
    return result;
}