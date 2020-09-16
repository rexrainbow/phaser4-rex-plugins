import { IBaseSizer } from '../IBaseSizer';
import { IPadding } from '../../util/IPadding';
import { GetBoundsConfig } from '../../../../utils/bounds/GetBoundsConfig';

export interface IAddBackgroundConfig {
    padding?: IPadding | number
    childKey?: string
}

export function AddBackground(
    sizer: IBaseSizer,
    child: any,
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

    const childSizerState = sizer.rexSizer;
    childSizerState.padding = GetBoundsConfig(padding);

    if (childKey !== undefined) {
        sizer.addChildrenMap(childKey, child)
    }
}