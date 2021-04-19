import { ISizer } from '../ISizer';
import { PreLayout as PreLayoutBase } from '../../basesizer/layout/PreLayout';

export function PreLayout(
    sizer: ISizer
) {

    sizer._childrenProportion = undefined;
    PreLayoutBase(sizer);
}