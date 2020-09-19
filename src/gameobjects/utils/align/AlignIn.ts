import { IBoundsObject } from './bounds/IBoundsObject';
import { AlignPositionMode } from '../../../utils/types/AlignPositionMode';
import * as Bounds from './bounds';

/*
alignPositionMode:
0 1 2
3 4 5
6 7 8
*/

export function AlignIn(
    child: IBoundsObject,
    parent: IBoundsObject,
    alignPositionMode: AlignPositionMode = AlignPositionMode.CENTER,
    offsetX: number = 0,
    offsetY: number = 0
) {

    const hAlign = (alignPositionMode % 3);
    switch (hAlign) {
        case 0:
            Bounds.SetLeft(child, Bounds.GetLeft(parent));
            break;
        case 1:
            Bounds.SetCenterX(child, Bounds.GetCenterX(parent));
            break;
        default:
            Bounds.SetRight(child, Bounds.GetRight(parent));
            break;
    }

    const vAlign = Math.floor(alignPositionMode / 3);
    switch (vAlign) {
        case 0:
            Bounds.SetTop(child, Bounds.GetTop(parent));
            break;
        case 1:
            Bounds.SetCenterY(child, Bounds.GetCenterY(parent));
            break;
        default:
            Bounds.SetBottom(child, Bounds.GetBottom(parent));
            break;
    }

    child.x -= offsetX;
    child.y -= offsetY;
}