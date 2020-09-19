import { ISizer } from '../ISizer';
import { RemoveChildren } from '@phaserjs/phaser/display/RemoveChildren';
import { IChild } from '../../util/IChild';

export function RemoveAll(
    sizer: ISizer,
    destroyChild: boolean = true
) {
    // Remove from container
    RemoveChildren(sizer, ...sizer.sizerChildren);

    // Store children into another array
    let destroyChildren: IChild[];
    if (destroyChild) {
        destroyChildren = [];
        destroyChildren.push.apply(destroyChildren, sizer.sizerChildren);
    }

    // Remove child from sizerChildren
    sizer.sizerChildren.length = 0;

    // Destroy children
    if (destroyChild) {
        destroyChildren.forEach(function (child) {
            child.destroy();
        })
    }
}