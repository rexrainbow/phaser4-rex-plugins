import { IBaseSizer } from '../../basesizer/IBaseSizer';

export function GetChildrenSizers(
    sizer: IBaseSizer,
    out: IBaseSizer[] = []
): IBaseSizer[] {

    const children = sizer.sizerChildren as IBaseSizer[];
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child.isRexSizer) {
            out.push(child);
        }
    }
    return out;
}