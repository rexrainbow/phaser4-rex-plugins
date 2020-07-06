import { IBoardBase } from '../IBoardBase';
import { ZType } from '../../types';
import { WorldXYToTileXY } from './WorldXYToTileXY';
import { Contains } from '../tileposition/Contains'


export let IsOverlappingPoint = function (
    board: IBoardBase,
    worldX: number,
    worldY: number,
    tileZ?: ZType
): boolean {

    if (board.infinityMode && (tileZ === undefined)) {
        return true;
    }

    let out = WorldXYToTileXY(board, worldX, worldY, true);
    return Contains(board, out.x, out.y, tileZ);
}