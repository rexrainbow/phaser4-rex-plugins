import { IBaseSizer } from '../IBaseSizer';
import { ResizeGameObject } from '../../../../utils/size/ResizeGameObject';
import { Zone } from '../../util/align/Zone';
import { AlignIn } from '../../util/align/AlignIn';

export function LayoutBackgrounds(
    sizer: IBaseSizer
) {

    if (sizer.backgroundChildren === undefined) {
        return;
    }

    var x = 0, // sizer.left
        y = 0, // sizer.top
        width = sizer.width,
        height = sizer.height;
    const backgrounds = sizer.backgroundChildren;
    for (let i = 0, cnt = backgrounds.length; i < cnt; i++) {
        const child = backgrounds[i];
        const childSizerState = child.rexSizer;
        if (childSizerState.hidden) {
            continue;
        }

        const padding = childSizerState.padding;
        const childTLX = x + padding.left;
        const childTLY = y + padding.top;
        const childWidth = width - padding.left - padding.right;
        const childHeight = height - padding.top - padding.bottom;
        ResizeGameObject(child, childWidth, childHeight);
        Zone.setPosition(childTLX, childTLY).setSize(childWidth, childHeight);
        AlignIn(child, Zone);
    }
}