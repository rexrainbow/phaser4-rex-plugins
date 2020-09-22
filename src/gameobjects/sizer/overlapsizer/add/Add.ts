import { Add as BaseAdd } from '../../../container/add/Add';
import { ISizer, ISizerState } from '../IOverlapSizer';
import { IChild } from '../../util/IChild';
import { IAddConfig } from './IAddConfig';
import { AlignPositionMode } from '../../../../utils/types/AlignPositionMode';
import { GetBoundsConfig } from '../../../../utils/bounds/GetBoundsConfig';

export function Add(
    sizer: ISizer,
    child: IChild,
    {
        key = Date.now(),
        padding = 0,
        align = AlignPositionMode.CENTER,
        expand = true
    }: IAddConfig = {}
) {

    BaseAdd(sizer, child);

    if (typeof (align) === 'string') {
        align = AlignPositionMode[align];
    }

    const childSizerState = sizer.getSizerState(child) as ISizerState;
    childSizerState.key = key;
    childSizerState.align = align;
    childSizerState.padding = GetBoundsConfig(padding);

    if (typeof (expand) === 'boolean') {
        childSizerState.expandWidth = expand;
        childSizerState.expandHeight = expand;
    } else {
        let {
            width = false,
            height = false
        } = expand;
        childSizerState.expandWidth = width;
        childSizerState.expandHeight = height;
    }

    if (sizer.sizerChildren.has(key)) {
        sizer.sizerChildren.get(key).destroy();
    }
    sizer.sizerChildren.set(key, child);
}