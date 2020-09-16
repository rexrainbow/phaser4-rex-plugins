import { IBaseSizer } from '../IBaseSizer';

export function LayoutInit(
    sizer: IBaseSizer
) {

    sizer._childrenWidth = undefined;
    sizer._childrenHeight = undefined;
}