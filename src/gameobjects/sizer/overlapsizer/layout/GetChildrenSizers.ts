import { ISizer } from '../IOverlapSizer';
import { IBaseSizer } from '../../basesizer/IBaseSizer';
import { BaseSizer } from '../../basesizer';

export function GetChildrenSizers(
    sizer: ISizer,
    out: IBaseSizer[] = []
): IBaseSizer[] {

    for (const [key, child] of sizer.sizerChildren) {
        if (child instanceof BaseSizer) {
            out.push(child);
        }
    }
    return out;
}