import { IBaseBoard } from '../IBaseBoard';
import { BoundsType } from '../../../utils/types/BoundsType';
import { XYType } from '../../types';
import { WorldXYToTileXY } from '../worldxy/WorldXYToTileXY';
import { TileXYToWorldXY } from '../worldxy/TileXYToWorldXY';
import { Clamp } from '../../../utils/math/Clamp.js';

export {BoundsType as ShapeType};
export type ContainsCallbackType = (shape: BoundsType, x: number, y: number) => boolean

export let ShapeToTileXYArray = function (
    board: IBaseBoard,
    shape: BoundsType,
    containsCallback: ContainsCallbackType,
    out: XYType[] = []
): XYType[] {

    let topLeftTileXY = WorldXYToTileXY(board, shape.left, shape.top, true);
    let left = topLeftTileXY.x - 1,
        top = topLeftTileXY.y - 1;
    let bottomRightTileXY = WorldXYToTileXY(board, shape.right, shape.bottom, true);
    let right = bottomRightTileXY.x + 1,
        bottom = bottomRightTileXY.y + 1;
    if (!board.infinityMode) {
        left = Clamp(left, 0, board.width - 1);
        top = Clamp(top, 0, board.height - 1);
        right = Clamp(right, 0, board.width - 1);
        bottom = Clamp(bottom, 0, board.height - 1);
    }

    for (let x = left; x <= right; x++) {
        for (let y = top; y <= bottom; y++) {
            let targetWorldXY = TileXYToWorldXY(board, x, y, true);
            if (containsCallback(shape, targetWorldXY.x, targetWorldXY.y)) {
                out.push({ x: x, y: y });
            }
        }
    }

    return out;
};