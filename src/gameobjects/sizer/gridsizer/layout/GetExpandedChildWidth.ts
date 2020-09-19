import { ISizerState } from '../IGridSizer';
import { IChild } from '../../util/IChild';

export function GetExpandedChildWidth(
    child: IChild,
    colWidth: number
): number {

    let newWidth: number;
    const childSizerState = child.rexSizer as ISizerState;
    if (childSizerState.expand) {
        const padding = childSizerState.padding;
        newWidth = colWidth - padding.left - padding.right;
    }
    return newWidth;

}