import { IBaseSizer } from '../IBaseSizer';
import { IChild } from '../../util/IChild';

export function AddChildrenMap(
    sizer: IBaseSizer,
    key: string,
    child: IChild
) {

    if (sizer.childrenMap === undefined) {
        sizer.childrenMap = {};
    }
    sizer.childrenMap[key] = child;
}