import { AddChild } from '@phaserjs/phaser/display';
import { IBaseSizer } from '../IBaseSizer';
import { IChild } from '../../util/IChild';

export function Pin(
    sizer: IBaseSizer,
    child: IChild
) {

    AddChild(sizer, child);
}