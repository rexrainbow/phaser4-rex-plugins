import { IBaseSizer } from '../IBaseSizer';
import { IChild } from '../../util/IChild';
import { GetParentSizer } from '../../util/parent/GetParentSizer';

export function IsChild(
    sizer: IBaseSizer,
    child: IChild
): boolean {

    return (GetParentSizer(child) === sizer);
}