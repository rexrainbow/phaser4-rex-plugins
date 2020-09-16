import { ISizer } from '../ISizer';
import { LayoutInit as BaseLayoutInit } from '../../basesizer/layout/LayoutInit';

export function LayoutInit(
    sizer: ISizer
) {

    BaseLayoutInit(sizer);
    sizer._childrenProportion = undefined;
}