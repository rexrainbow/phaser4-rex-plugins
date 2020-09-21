import { Add as BaseAdd } from '../../../container/add/Add';
import { ISizer, ISizerState } from '../ISizer';
import { IChild } from '../../util/IChild';
import { IAddConfig } from './IAddConfig';
import { AlignPositionMode } from '../../../../utils/types/AlignPositionMode';
import { GetBoundsConfig } from '../../../../utils/bounds/GetBoundsConfig';

export function Add(
    sizer: ISizer,
    child: IChild,
    {
        proportion = 0,
        align = AlignPositionMode.CENTER,
        padding = 0,
        expand = false,
        childKey,
        index
    }: IAddConfig = {}
) {

    BaseAdd(sizer, child);

    if (typeof (align) === 'string') {
        align = AlignPositionMode[align];
    }

    const childSizerState = sizer.getSizerState(child) as ISizerState;
    childSizerState.proportion = proportion;
    childSizerState.align = align;
    childSizerState.padding = GetBoundsConfig(padding);
    childSizerState.expand = expand;
    if ((index === undefined) || (index >= sizer.sizerChildren.length)) {
        sizer.sizerChildren.push(child);
    } else {
        sizer.sizerChildren.splice(index, 0, child);
    }

    if (childKey !== undefined) {
        sizer.addChildrenMap(childKey, child)
    }
};