import { ISizer, ISizerState } from '../ISizer';
import { IBaseSizer } from '../../basesizer/IBaseSizer';
import { OrientationMode } from '../../util/OrientationMode';

export function GetExpandedChildHeight(
    sizer: ISizer,
    child: IBaseSizer
): number {

    let newHeight: number;
    const childSizerState = child.rexSizer as ISizerState;
    const padding = childSizerState.padding;
    if (sizer.orientation === OrientationMode.x) { // x
        if (childSizerState.expand) {
            newHeight = sizer.innerHeight - padding.top - padding.bottom;
        }
    } else { // y
        if ((childSizerState.proportion > 0) && (sizer.proportionLength > 0)) {
            newHeight = (childSizerState.proportion * sizer.proportionLength);
        }
    }
    return newHeight;
}