import { ISizer } from '../IFixedWidthSizer';
import { RunWidthWrap as RunWidthWrapBase } from '../../basesizer/layout/RunWidthWrap'
import { RunChildrenWrap } from './RunChildrenWrap';

export function RunWidthWrap(
    sizer: ISizer,
    width: number
) {
    const innerWidth = width - sizer.space.left - sizer.space.right;
    sizer.widthWrapResult = RunChildrenWrap(sizer, innerWidth, sizer.widthWrapResult);
    RunWidthWrapBase(sizer, width);
}