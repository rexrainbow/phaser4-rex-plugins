import { ISizer } from '../ISizer';
import { IChild } from '../../util/IChild';
import { RemoveChild } from '@phaserjs/phaser/display/RemoveChild'

export function Remove(
    sizer: ISizer,
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
    sizerChildren.splice(sizerChildren.indexOf(child), 1);

    if (destroyChild) {
        child.destroy();
    }
}