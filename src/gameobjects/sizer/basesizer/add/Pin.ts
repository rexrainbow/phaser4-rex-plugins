import { Add as BaseAdd } from '../../../container/add/Add';
import { IBaseSizer } from '../IBaseSizer';
import { IChild } from '../../util/IChild';

export function Pin(
    sizer: IBaseSizer,
    child: IChild
) {

    BaseAdd(sizer, child);
}