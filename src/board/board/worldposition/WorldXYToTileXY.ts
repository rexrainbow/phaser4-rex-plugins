import { IBoardBase } from '../IBoardBase';
import { XYType } from '../../types';


export let WorldXYToTileXY = function (
    board: IBoardBase,
    worldX: number,
    worldY: number,
    out: XYType | true = { x: 0, y: 0 }
): XYType {

    return board.grid.getTileXY(worldX, worldY, out);
}