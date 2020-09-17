import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { AlignPositionMode } from '../../../../utils/types/AlignPositionMode';
import {
    GetLeft, GetCenterX, GetRight,
    GetTop, GetCenterY, GetBottom,
    SetLeft, SetCenterX, SetRight,
    SetTop, SetCenterY, SetBottom
} from '../../../utils/bounds';

/*
alignPositionMode:
0 1 2
3 4 5
6 7 8
*/

export function AlignIn(
    child: IContainer,
    parent: IContainer,
    alignPositionMode: AlignPositionMode = AlignPositionMode.CENTER,
    offsetX: number = 0,
    offsetY: number = 0
) {

    const hAlign = (alignPositionMode % 3);
    switch (hAlign) {
        case 0:
            SetLeft(child, GetLeft(parent));
            break;
        case 1:
            SetCenterX(child, GetCenterX(parent));
            break;
        default:
            SetRight(child, GetRight(parent));
            break;
    }

    const vAlign = Math.floor(alignPositionMode / 3);
    switch (vAlign) {
        case 0:
            SetTop(child, GetTop(parent));
            break;
        case 1:
            SetCenterY(child, GetCenterY(parent));
            break;
        default:
            SetBottom(child, GetBottom(parent));
            break;
    }

    child.x -= offsetX;
    child.y -= offsetY;
}