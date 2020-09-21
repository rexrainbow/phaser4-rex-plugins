import { ISizer, ISizerState } from '../ISizer';
import { BaseSizer } from '../../basesizer';
import { IsSpace } from '../space/IsSpace';

export function GetChildrenHeight(
    sizer: ISizer,
    minimumMode: boolean = true
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    const children = sizer.sizerChildren;
    let result = 0;
    if (sizer.orientation === 0) { // x
        // Get maximun height
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            const child = children[i];
            const childSizerState = child.rexSizer as ISizerState;
            if (childSizerState.hidden) {
                continue;
            }

            let childHeight = (child instanceof BaseSizer) ?
                Math.max(child.minHeight, child.childrenHeight) :
                child.height;

            const padding = childSizerState.padding;
            childHeight += (padding.top + padding.bottom);
            result = Math.max(childHeight, result);
        }
    } else {
        // Get summation of minimum height
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            const child = children[i];
            if (!child.hasOwnProperty('rexSizer')) {
                continue;
            }
            const childSizerState = child.rexSizer as ISizerState;
            if (childSizerState.hidden) {
                continue;
            }

            let childHeight: number;
            if (
                (childSizerState.proportion === 0) ||
                (minimumMode && (!IsSpace(child)) && (childSizerState.proportion > 0))
            ) {
                childHeight = (child instanceof BaseSizer) ?
                    Math.max(child.minHeight, child.childrenHeight) :
                    child.height;
            } else {
                childHeight = 0;
            }
            const padding = childSizerState.padding;
            childHeight += (padding.top + padding.bottom);
            if (i > 0) {
                childHeight += sizer.space.item;
            }
            result += childHeight;
        }
    }
    return result + sizer.space.top + sizer.space.bottom;
}