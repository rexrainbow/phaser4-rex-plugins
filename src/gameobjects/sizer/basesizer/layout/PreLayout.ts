import { IBaseSizer } from '../IBaseSizer';

export function PreLayout(
    sizer: IBaseSizer,
    parent?: IBaseSizer,
    width?: number,
    height?: number
) {

    // Only run PreLayout in topMostSizer.layout()
    if (parent) {
        return;
    }

    sizer.layoutInit();
    const children = sizer.getChildrenSizers();
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child.rexSizer.hidden || (!child.needLayout)) {
            continue;
        }
        PreLayout(child);
    }
}