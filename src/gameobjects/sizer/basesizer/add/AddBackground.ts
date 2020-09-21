import { Add as BaseAdd } from '../../../container/add/Add';
import { IBaseSizer } from '../IBaseSizer';
import { IChild } from '../../util/IChild';
import { IAddBackgroundConfig } from './IAddBackgroundConfig';
import { GetBoundsConfig } from '../../../../utils/bounds/GetBoundsConfig';

export function AddBackground(
    sizer: IBaseSizer,
    child: IChild,
    {
        padding = 0,
        childKey
    }: IAddBackgroundConfig = {}
) {

    if (sizer.backgroundChildren === undefined) {
        sizer.backgroundChildren = [];
    }

    BaseAdd(sizer, child);
    sizer.backgroundChildren.push(child);

    const childSizerState = sizer.getSizerState(child);
    childSizerState.padding = GetBoundsConfig(padding);

    if (childKey !== undefined) {
        sizer.addChildrenMap(childKey, child)
    }
}