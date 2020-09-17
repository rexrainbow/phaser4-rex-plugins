import { IBaseSizer } from '../IBaseSizer';
import { IChild } from '../../util/IChild';
import { IPadding } from '../../util/IPadding';
import { GetBoundsConfig } from '../../../../utils/bounds/GetBoundsConfig';

export interface IAddBackgroundConfig {
    padding?: IPadding | number
    childKey?: string
}

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

    sizer.pin(child);
    sizer.backgroundChildren.push(child);

    const childSizerState = sizer.getSizerState(child);
    childSizerState.padding = GetBoundsConfig(padding);

    if (childKey !== undefined) {
        sizer.addChildrenMap(childKey, child)
    }
}