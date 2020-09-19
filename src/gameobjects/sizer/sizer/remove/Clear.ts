import { ISizer } from '../ISizer';
import { RemoveChildren } from '@phaserjs/phaser/display/RemoveChildren';
import { IChild } from '../../util/IChild';

export function Clear(
    sizer: ISizer,
    destroyChild: boolean = true
) {
    // Remove from container
    RemoveChildren(sizer, ...sizer.sizerChildren);
    if (sizer.backgroundChildren) {
        RemoveChildren(sizer, ...sizer.backgroundChildren);
    }

    // Store children into another array
    let destroyChildren: IChild[];
    if (destroyChild) {
        destroyChildren = [];
        destroyChildren.push.apply(destroyChildren, sizer.sizerChildren);

        if (sizer.backgroundChildren) {
            destroyChildren.push.apply(destroyChildren, sizer.backgroundChildren);
        }
    }

    // Remove child from sizerChildren, and backgroundChildren
    sizer.sizerChildren.length = 0;
    if (sizer.backgroundChildren) {
        sizer.backgroundChildren.length = 0;
    }

    // Destroy children
    if (destroyChild) {
        destroyChildren.forEach(function (child) {
            child.destroy();
        })
    }

}