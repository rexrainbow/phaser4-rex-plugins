import {
    ILogicBoard,
    XType, YType
} from '../ILogicBoard';
import { PositionType } from '../../../utils/types/PositionType'

export let TileXYToWorldXY = function (
    board: ILogicBoard,
    tileX: XType,
    tileY: YType,
    out?: PositionType
): PositionType {

    return board.grid.getWorldXY(tileX, tileY, out);
}