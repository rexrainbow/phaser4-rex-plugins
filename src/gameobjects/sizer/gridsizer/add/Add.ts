import { Add as BaseAdd } from '../../../container/add/Add';
import { ISizer, ISizerState } from '../IGridSizer';
import { IChild } from '../../util/IChild';
import { IAddConfig } from './IAddConfig';
import { AlignPositionMode } from '../../../../utils/types/AlignPositionMode';
import { GetBoundsConfig } from '../../../../utils/bounds/GetBoundsConfig';
import { GetEmptyItemIndex } from './GetEmptyItemIndex';

export function Add(
    sizer: ISizer,
    child: IChild,
    {
        column,
        row,
        align = AlignPositionMode.CENTER,
        padding = 0,
        expand = true,
        childKey
    }: IAddConfig = {}
) {

    // Get insert index
    const itemIndex = GetEmptyItemIndex(column, row, sizer.sizerChildren, sizer.columnCount, sizer.rowCount);
    if (itemIndex === null) {
        return;
    }

    BaseAdd(sizer, child);

    if (typeof (align) === 'string') {
        align = AlignPositionMode[align];
    }

    const childSizerState = sizer.getSizerState(child) as ISizerState;
    childSizerState.align = align;
    childSizerState.padding = GetBoundsConfig(padding);
    childSizerState.expand = expand;
    sizer.sizerChildren[itemIndex] = child;

    if (childKey !== undefined) {
        sizer.addChildrenMap(childKey, child)
    }
}