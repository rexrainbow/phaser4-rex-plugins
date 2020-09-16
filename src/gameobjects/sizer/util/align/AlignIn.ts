import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { AlignPositionMode } from '../../../../utils/types/AlignPositionMode';
import { GetLeft } from '../../../../utils/bounds/GetLeft';
import { GetCenterX } from '../../../../utils/bounds/GetCenterX';
import { GetRight } from '../../../../utils/bounds/GetRight';
import { GetTop } from '../../../../utils/bounds/GetTop';
import { GetCenterY } from '../../../../utils/bounds/GetCenterY';
import { GetBottom } from '../../../../utils/bounds/GetBottom';
import { SetLeft } from '../../../../utils/bounds/SetLeft';
import { SetCenterX } from '../../../../utils/bounds/SetCenterX';
import { SetRight } from '../../../../utils/bounds/SetRight';
import { SetTop } from '../../../../utils/bounds/SetTop';
import { SetCenterY } from '../../../../utils/bounds/SetCenterY';
import { SetBottom } from '../../../../utils/bounds/SetBottom';

/*
positionMode:
0 1 2
3 4 5
6 7 8
*/

export function AlignIn(
    child: IContainer,  // Assume that child is a rectangle
    parent: IContainer, // Assume that parent is a rectangle
    positionMode: AlignPositionMode = AlignPositionMode.CENTER,
    offsetX: number = 0,
    offsetY: number = 0
) {

    switch (positionMode) {
        // CENTER
        case 1:
        case 4:
        case 7:
            SetCenterX(child, GetCenterX(parent));
            break;
        // LEFT
        case 0:
        case 3:
        case 6:
            SetLeft(child, GetLeft(parent));
            break;
        // RIGHT
        default:
            SetRight(child, GetRight(parent));
            break;
    }

    switch (positionMode) {
        // CENTER
        case 3:
        case 4:
        case 5:
            SetCenterY(child, GetCenterY(parent));
            break;
        // TOP
        case 0:
        case 1:
        case 2:
            SetTop(child, GetTop(parent));
            break;
        // BOTTOM
        default:
            SetBottom(child, GetBottom(parent));
            break;
    }

    child.x -= offsetX;
    child.y -= offsetY;
}