import { ISizer } from '../IFixedWidthSizer';
import { PreLayout as PreLayoutBase } from '../../basesizer/layout/PreLayout';

export function PreLayout(
    sizer: ISizer
) {

    sizer._maxChildWidth = undefined;
    sizer._maxChildHeight = undefined;
    PreLayoutBase(sizer);
}