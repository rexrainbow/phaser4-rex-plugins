import { ISizer, ISizerState } from '../ISizer';
import { IPadding } from '../../util/IPadding';
import { AlignPositionMode, AlignPositionModeString } from '../../../../utils/types/AlignPositionMode';
import { GetBoundsConfig } from '../../../../utils/bounds/GetBoundsConfig';

export interface IAddConfig {
    proportion?: number;
    padding?: IPadding | number;
    align?: AlignPositionMode | AlignPositionModeString;
    expand?: boolean;
    childKey?: string;
    index?: number
}

export function Add(
    sizer: ISizer,
    child: any,
    {
        proportion = 0,
        align = AlignPositionMode.CENTER,
        padding = 0,
        expand = false,
        childKey,
        index
    }: IAddConfig = {}
) {

    sizer.pin(child);

    if (typeof (align) === 'string') {
        align = AlignPositionMode[align];
    }

    const childSizerState = child.rexSizer as ISizerState;
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