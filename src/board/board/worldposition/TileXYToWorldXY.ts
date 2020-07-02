import {
    ILogicBoard,
    XType, YType, Vec2Type
} from '../ILogicBoard';

export let TileXYToWorldXY = function (
    board: ILogicBoard,
    tileX: XType,
    tileY: YType,
    out?: Vec2Type | true
): Vec2Type {

    return board.grid.getWorldXY(tileX, tileY, out);
}