import { Add as BaseAdd } from '../../../container/add/Add';
import { ISizer, ISizerState } from '../IFixedWidthSizer';
import { IChild } from '../../util/IChild';
import { IAddConfig } from './IAddConfig';
import { GetBoundsConfig } from '../../../../utils/bounds/GetBoundsConfig';

export function Add(
    sizer: ISizer,
    child: IChild,
    {
        padding = 0,
        childKey,
        index
    }: IAddConfig = {}
) {

    BaseAdd(sizer, child);

    const childSizerState = sizer.getSizerState(child) as ISizerState;
    childSizerState.padding = GetBoundsConfig(padding);
    if ((index === undefined) || (index >= sizer.sizerChildren.length)) {
        sizer.sizerChildren.push(child);
    } else {
        sizer.sizerChildren.splice(index, 0, child);
    }

    if (childKey !== undefined) {
        sizer.addChildrenMap(childKey, child)
    }
}