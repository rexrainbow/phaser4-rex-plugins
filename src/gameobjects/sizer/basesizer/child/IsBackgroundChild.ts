import { IBaseSizer } from '../IBaseSizer';
import { IChild } from '../../util/IChild';

export function IsBackgroundChild(
    sizer: IBaseSizer,
    child: IChild
): boolean {

    if (sizer.backgroundChildren) {
        return sizer.backgroundChildren.includes(child);
    } else {
        return false;
    }
}