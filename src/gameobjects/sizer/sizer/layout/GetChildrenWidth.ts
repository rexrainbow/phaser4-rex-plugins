import { ISizer, ISizerState } from '../ISizer';
import { BaseSizer } from '../../basesizer';
import { IsSpace } from '../space/IsSpace';

export function GetChildrenWidth(
    sizer: ISizer,
    minimumMode: boolean = true
): number {

    if (sizer.rexSizer.hidden) {
        return 0;
    }

    if (minimumMode === undefined) {
        minimumMode = true;
    }

    const children = sizer.sizerChildren;
    let result = 0;
    if (sizer.orientation === 0) { // x
        // Get summation of minimum width
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            const child = children[i];
            const childSizerState = child.rexSizer as ISizerState;
            if (childSizerState.hidden) {
                continue;
            }

            let childWidth: number;
            if (
                (childSizerState.proportion === 0) ||
                (minimumMode && (!IsSpace(child)) && (childSizerState.proportion > 0))
            ) {
                childWidth = (child instanceof BaseSizer) ?
                    Math.max(child.minWidth, child.childrenWidth) :
                    child.width;
            } else {
                childWidth = 0;
            }
            const padding = childSizerState.padding;
            childWidth += (padding.left + padding.right);
            if (i > 0) {
                childWidth += sizer.space.item;
            }
            result += childWidth;
        }
    } else {
        // Get maximun width
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            const child = children[i];
            if (!child.hasOwnProperty('rexSizer')) {
                continue;
            }
            const childSizerState = child.rexSizer as ISizerState;
            if (childSizerState.hidden) {
                continue;
            }

            let childWidth = (child instanceof BaseSizer) ?
                Math.max(child.minWidth, child.childrenWidth) :
                child.width;

            const padding = childSizerState.padding;
            childWidth += (padding.left + padding.right);
            result = Math.max(childWidth, result);
        }
    }
    return result + sizer.space.left + sizer.space.right;
}

export default GetChildrenWidth;