import { AddChild } from '@phaserjs/phaser/display';
import { IBaseSizer } from '../IBaseSizer';

export function Pin(
    sizer: IBaseSizer,
    child: any
) {

    AddChild(sizer, child);
}