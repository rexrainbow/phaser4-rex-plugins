import { ISizer, ISizerState } from '../IOverlapSizer';
import { IChild } from '../../util/IChild';

export function GetExpandedChildHeight(
    sizer: ISizer,
    child: IChild
): number {

    let newHeight: number;
    const childSizerState = child.rexSizer as ISizerState;
    if (childSizerState.expandHeight) {
        const padding = childSizerState.padding;
        newHeight = sizer.innerHeight - padding.top - padding.bottom;
    }
    return newHeight;
}