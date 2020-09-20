import { IBaseSizer } from '../IBaseSizer';
import { RemoveChildren } from '@phaserjs/phaser/display/RemoveChildren';
import { IChild } from '../../util/IChild';

export function RemoveAll(
    sizer: IBaseSizer,
    destroyChild: boolean = true
) {
    // Remove from container
    if (sizer.sizerChildren) {
        RemoveChildren(sizer, ...sizer.sizerChildren);
    }

    // Store children into another array
    let destroyChildren: IChild[];
    if (destroyChild) {
        destroyChildren = [];
        if (sizer.sizerChildren) {
            destroyChildren.push.apply(destroyChildren, sizer.sizerChildren);
        }
    }

    // Remove child from sizerChildren
    if (sizer.sizerChildren) {
        sizer.sizerChildren.length = 0;
    }

    // Destroy children
    if (destroyChild) {
        destroyChildren.forEach(function (child) {
            child.destroy();
        })
    }
}