import { ISizer } from '../ISizer';
import { Add } from './Add';
import { Space } from '../../space/Space';

export function AddSpace(
    sizer: ISizer,
    proportion: number = 1
) {

    const child = new Space();
    Add(sizer, child, { proportion: proportion });
};