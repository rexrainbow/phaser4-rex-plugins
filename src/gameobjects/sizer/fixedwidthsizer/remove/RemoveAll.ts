import { Remove as BaseRemove } from '../.././../container/remove/Remove';
import { ISizer } from '../IFixedWidthSizer';

export function RemoveAll(
    sizer: ISizer,
    destroyChild: boolean = true
) {

    const children = sizer.sizerChildren;
    for (let i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child === '\n') {
            continue;
        }

        BaseRemove(sizer, child, destroyChild);
    }

    // Clean up sizer children
    sizer.sizerChildren.length = 0;
}