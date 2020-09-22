import { ISizer, ISizerState } from '../IOverlapSizer';
import { IChild } from '../../util/IChild';

export function GetExpandedChildWidth(
    sizer: ISizer,
    child: IChild
): number {

    let newWidth: number;
    const childSizerState = child.rexSizer as ISizerState;
    if (childSizerState.expandWidth) {
        const padding = childSizerState.padding;
        newWidth = sizer.innerWidth - padding.left - padding.right;
    }
    return newWidth;
}