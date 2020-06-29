import {
    ILogicBoard,
    XType, YType, PositionType
} from '../ILogicBoard';

export let TileXYToWorldXY = function (
    board: ILogicBoard,
    tileX: XType,
    tileY: YType,
    out?: PositionType | true
): PositionType {

    return board.grid.getWorldXY(tileX, tileY, out);
}