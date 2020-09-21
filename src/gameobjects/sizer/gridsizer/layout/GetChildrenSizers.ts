import { ISizer } from '../IGridSizer';
import { IBaseSizer } from '../../basesizer/IBaseSizer';
import { BaseSizer } from '../../basesizer';

export function GetChildrenSizers(
    sizer: ISizer,
    out: IBaseSizer[] = []
): IBaseSizer[] {

    const children = sizer.sizerChildren;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child && (child instanceof BaseSizer)) {
            out.push(child);
        }
    }
    return out;
}