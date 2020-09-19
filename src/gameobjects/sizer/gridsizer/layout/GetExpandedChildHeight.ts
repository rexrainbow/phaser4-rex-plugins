import { ISizerState } from '../IGridSizer';
import { IChild } from '../../util/IChild';

export function GetExpandedChildHeight(
    child: IChild,
    rowHeight: number
): number {

    let newHeight: number;
    const childSizerState = child.rexSizer as ISizerState;
    if (childSizerState.expand) {
        const padding = childSizerState.padding;
        newHeight = rowHeight - padding.top - padding.bottom;
    }
    return newHeight;
}