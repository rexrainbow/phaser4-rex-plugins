import { ISizer, ISizerState } from '../ISizer';
import { IsSpace } from '../space/IsSpace';
import { OrientationMode } from '../../util/OrientationMode';

export function GetChildrenHeight(
    sizer: ISizer,
    minimumMode: boolean = true
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    const children = sizer.sizerChildren;
    let result = 0;
    if (sizer.orientation === OrientationMode.x) {
        // Get maximun height
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            const child = children[i];
            const childSizerState = child.rexSizer as ISizerState;
            if (childSizerState.hidden) {
                continue;
            }

            const padding = childSizerState.padding;
            const childHeight = sizer.getChildHeight(child) + padding.top + padding.bottom;
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

            const padding = childSizerState.padding;
            let childHeight: number;
            if (
                (childSizerState.proportion === 0) ||
                (minimumMode && (!IsSpace(child)) && (childSizerState.proportion > 0))
            ) {
                childHeight = sizer.getChildHeight(child);
            } else {
                childHeight = 0;
            }
            childHeight += (padding.top + padding.bottom);
            if (i > 0) {
                childHeight += sizer.space.item;
            }
            result += childHeight;
        }
    }
    return result + sizer.space.top + sizer.space.bottom;
}