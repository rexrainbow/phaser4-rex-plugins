import { IBaseBoard } from '../IBaseBoard';
import { BoundsType as ShapeType } from '../../../utils/types/BoundsType';
import { XYType } from '../../Types';
import { WorldXYToTileXY } from '../worldxy/WorldXYToTileXY';
import { TileXYToWorldXY } from '../worldxy/TileXYToWorldXY';
import { Clamp } from '../../../utils/math/Clamp';

export { ShapeType };
export type ContainsCallbackType = (shape: ShapeType, x: number, y: number) => boolean

export function ShapeToTileXYArray(
    board: IBaseBoard,
    shape: ShapeType,
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