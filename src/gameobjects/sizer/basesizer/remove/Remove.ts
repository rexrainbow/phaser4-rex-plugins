import { IBaseSizer } from '../IBaseSizer';
import { IChild } from '../../util/IChild';
import { RemoveChild } from '@phaserjs/phaser/display/RemoveChild'

export function Remove(
    sizer: IBaseSizer,
    child: IChild,
    destroyChild: boolean = true
) {

    if (!sizer.isChild(child)) {
        return
    }

    // Remove child from container
    RemoveChild(sizer, child);
    // Remove child from sizerChildren
    const sizerChildren = sizer.sizerChildren;
    if (sizerChildren) {
        sizerChildren.splice(sizerChildren.indexOf(child), 1);
    }

    if (destroyChild) {
        child.destroy();
    }
}