import { ISizer, ISizerState } from '../ISizer';
import { IChild } from '../../util/IChild';
import { OrientationMode } from '../../util/OrientationMode';

export function GetExpandedChildWidth(
    sizer: ISizer,
    child: IChild,
    parentWidth: number = sizer.width
): number {

    let newWidth: number;
    const childSizerState = child.rexSizer as ISizerState;
    const padding = childSizerState.padding;
    if (sizer.orientation === OrientationMode.x) { // x
        if ((childSizerState.proportion > 0) && (sizer.proportionLength > 0)) {
            newWidth = (childSizerState.proportion * sizer.proportionLength);
        }
    } else { // y
        if (childSizerState.expand) {
            const innerWidth = parentWidth - sizer.space.left - sizer.space.right;
            newWidth = innerWidth - padding.left - padding.right;
        }
    }
    return newWidth;
}