import { IBaseBoard } from '../IBaseBoard';
import { XYType } from '../../Types';


export function WorldXYToTileXY(
    board: IBaseBoard,
    worldX: number,
    worldY: number,
    out: XYType | true = { x: 0, y: 0 }
): XYType {

    return board.grid.getTileXY(worldX, worldY, out);
}