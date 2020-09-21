import { ISizer } from '../IFixedWidthSizer';
import { BaseSizer } from '../../basesizer';
import { IChild } from '../../util/IChild';

export function GetMaxChildHeight(
    sizer: ISizer,
    children: (IChild | '\n')[] = sizer.sizerChildren
): number {

    let result = 0;
    for (let i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child === '\n') {
            continue;
        }

        const childHeight = (child instanceof BaseSizer) ?
            Math.max(child.minHeight, child.childrenHeight) :
            child.height;
        result = Math.max(childHeight, result);
    }
    return result;
}