import { ISizer, ISizerState } from '../ISizer';
import { IBaseSizer } from '../../basesizer/IBaseSizer';
import { OrientationMode } from '../../util/OrientationMode';

export function GetExpandedChildWidth(
    sizer: ISizer,
    child: IBaseSizer
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
            newWidth = sizer.innerWidth - padding.left - padding.right;
        }
    }
    return newWidth;
}