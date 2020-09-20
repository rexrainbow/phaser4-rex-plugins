import { IBaseSizer } from '../IBaseSizer';
import { IChild } from '../../util/IChild';
import { IsChild } from '../child/IsChild';
import { IsBackgroundChild } from '../child/IsBackgroundChild';
import { RemoveChild } from '@phaserjs/phaser/display/RemoveChild';

export function Remove(
    sizer: IBaseSizer,
    child: IChild,
    destroyChild: boolean = true
) {

    if (!IsChild(sizer, child)) {
        return
    }

    // Remove child from container
    RemoveChild(sizer, child);

    // Remove child from sizerChildren, or backgroundChildren
    const children = (IsBackgroundChild(sizer, child)) ?
        sizer.backgroundChildren :
        sizer.sizerChildren;
    if (children) {
        children.splice(children.indexOf(child), 1);
    }

    if (destroyChild) {
        child.destroy();
    }
}