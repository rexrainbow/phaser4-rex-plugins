import { IBaseSizer } from '../IBaseSizer';

export function AddChildrenMap(
    sizer: IBaseSizer,
    key: string,
    child: any
) {

    if (sizer.childrenMap === undefined) {
        sizer.childrenMap = {};
    }
    sizer.childrenMap[key] = child;
}