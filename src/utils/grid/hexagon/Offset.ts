import { IHexagon, LayoutMode, PositionType } from './IHexagon';
import { IOffset } from '../IGrid';

export let Offset: IOffset = function (
    hexagon: IHexagon,
    srcTileXY,
    offsetX,
    offsetY,
    out = { x: 0, y: 0 }
) {

    if (out === true) {
        out = globTileXY;
    }

    let newX = srcTileXY.x + offsetX;
    let newY = srcTileXY.y + offsetY;
    switch (hexagon.mode) {
        case LayoutMode.ODD_R:
            if ((offsetY & 1) !== 0) {
                if ((newY & 1) === 0) {
                    newX += 1;
                }
            }
            break;

        case LayoutMode.EVEN_R:
            if ((offsetY & 1) !== 0) {
                if ((newY & 1) === 0) {
                    newX -= 1;
                }
            }
            break;

        case LayoutMode.ODD_Q:
            if ((offsetX & 1) !== 0) {
                if ((newX & 1) == 0) {
                    newY += 1;
                }
            }
            break;
        case LayoutMode.EVEN_Q:
            if ((offsetX & 1) !== 0) {
                if ((newX & 1) == 0) {
                    newY -= 1;
                }
            }
            break;
    }
    out.x = newX;
    out.y = newY;
    return out;
}

var globTileXY: PositionType = { x: 0, y: 0 };