import {
    ILogicBoard,
    XYType
} from '../ILogicBoard';

export let WorldXYToTileXY = function (
    board: ILogicBoard,
    worldX: number,
    worldY: number,
    out: XYType | true = { x: 0, y: 0 }
): XYType {

    return board.grid.getTileXY(worldX, worldY, out);
}