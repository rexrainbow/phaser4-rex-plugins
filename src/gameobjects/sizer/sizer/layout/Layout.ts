import { ISizer, ISizerState } from '../ISizer';
import { IBaseSizer } from '../../basesizer/IBaseSizer';
import { BaseSizer } from '../../basesizer';
import { OrientationMode } from '../../util/OrientationMode';
import { GetExpandedChildWidth } from './GetExpandedChildWidth';
import { GetExpandedChildHeight } from './GetExpandedChildHeight';
import { ResizeGameObject } from '../../../../utils/size/ResizeGameObject';
import { Zone } from '../../util/align/Zone';
import { AlignIn } from '../../util/align/AlignIn';

export function Layout(
    sizer: ISizer,
    parent?: IBaseSizer,
    minWidth?: number,
    minHeight?: number) {

    // Skip hidden or !needLayout sizer
    if (sizer.rexSizer.hidden || (!sizer.needLayout)) {
        return;
    }

    sizer.preLayout(parent);

    // Set size
    if (minWidth === undefined) {
        minWidth = Math.max(sizer.childrenWidth, sizer.minWidth);
    }
    if (minHeight === undefined) {
        minHeight = Math.max(sizer.childrenHeight, sizer.minHeight);
    }
    sizer.resize(minWidth, minHeight);

    let proportionLength: number;
    if (sizer.childrenProportion > 0) {
        let remainder = (sizer.orientation === OrientationMode.x) ?
            (sizer.width - sizer.childrenWidth) :
            (sizer.height - sizer.childrenHeight);

        if (remainder > 0) {
            remainder = (sizer.orientation === OrientationMode.x) ?
                (sizer.width - sizer.getChildrenWidth(false)) :
                (sizer.height - sizer.getChildrenHeight(false));
            proportionLength = remainder / sizer.childrenProportion;
        } else {
            proportionLength = 0;
        }
    } else {
        proportionLength = 0;
    }
    sizer.proportionLength = proportionLength;

    // Layout children    
    const children = sizer.sizerChildren;
    const startX = sizer.innerLeft;
    const startY = sizer.innerTop;
    const innerWidth = sizer.innerWidth;
    const innerHeight = sizer.innerHeight;
    let itemX = startX,
        itemY = startY;
    for (let i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        if (child.rexSizer.hidden) {
            continue;
        }

        const childSizerState = child.rexSizer as ISizerState;
        const padding = childSizerState.padding;

        // Set size
        let childWidth = GetExpandedChildWidth(sizer, child);
        let childHeight = GetExpandedChildHeight(sizer, child);
        if (child instanceof BaseSizer) {
            child._layout(sizer, childWidth, childHeight);
        } else {
            ResizeGameObject(child, childWidth, childHeight);
        }

        if (childWidth === undefined) {
            childWidth = child.width;
        }
        if (childHeight === undefined) {
            childHeight = child.height;
        }

        // Set position
        let x: number, y: number, width: number, height: number;
        if (sizer.orientation === OrientationMode.x) { // x
            x = (itemX + padding.left);
            if ((childSizerState.proportion === 0) || (proportionLength === 0)) {
                width = childWidth;
            } else {
                width = (childSizerState.proportion * proportionLength);
            }

            y = (itemY + padding.top);
            height = (innerHeight - padding.top - padding.bottom);
        } else { // y
            x = (itemX + padding.left);
            width = (innerWidth - padding.left - padding.right);

            y = (itemY + padding.top);
            if ((childSizerState.proportion === 0) || (proportionLength === 0)) {
                height = childHeight;
            } else {
                height = (childSizerState.proportion * proportionLength);
            }
        }

        // TODO
        Zone.setPosition(x, y).setSize(width, height);
        AlignIn(child, Zone, childSizerState.align);

        if (sizer.orientation === OrientationMode.x) {
            itemX += (width + padding.left + padding.right + sizer.space.item);
        } else { // y
            itemY += (height + padding.top + padding.bottom + sizer.space.item);
        }
    }

    // Layout background children
    sizer.layoutBackgrounds();

    sizer.postLayout();
}