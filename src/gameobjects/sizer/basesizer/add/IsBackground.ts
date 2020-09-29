import { IBaseSizer } from '../IBaseSizer';
import { IChild } from '../../util/IChild';

export function IsBackground(
    sizer: IBaseSizer,
    child: IChild
): boolean {

    if (sizer.backgroundChildren === undefined) {
        return false;
    }
    return sizer.backgroundChildren.includes(child);
}