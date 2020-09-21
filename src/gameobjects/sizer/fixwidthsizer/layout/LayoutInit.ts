import { ISizer } from '../IFixedWidthSizer';
import { LayoutInit as BaseLayoutInit } from '../../basesizer/layout/LayoutInit';

export function LayoutInit(
    sizer: ISizer
) {

    BaseLayoutInit(sizer);
    sizer._maxChildWidth = undefined;
    sizer._maxChildHeight = undefined;
}