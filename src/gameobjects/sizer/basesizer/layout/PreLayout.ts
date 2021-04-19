import { IBaseSizer } from '../IBaseSizer';

export function PreLayout(
    sizer: IBaseSizer
) {

    sizer._childrenWidth = undefined;
    sizer._childrenHeight = undefined;

    const children = sizer.getChildrenSizers();
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child.ignoreLayout) {
            continue;
        }
        PreLayout(child);
    }
}