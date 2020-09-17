import { IBaseSizer } from '../../basesizer/IBaseSizer';
import { BaseSizer } from '../../basesizer';

export function GetChildrenSizers(
    sizer: IBaseSizer,
    out: IBaseSizer[] = []
): IBaseSizer[] {

    const children = sizer.sizerChildren as IBaseSizer[];
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child instanceof BaseSizer) {
            out.push(child);
        }
    }
    return out;
}