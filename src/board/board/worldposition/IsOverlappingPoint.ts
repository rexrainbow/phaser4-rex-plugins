import {
    ILogicBoard,
    ZType
} from '../ILogicBoard';
import { WorldXYToTileXY } from './WorldXYToTileXY';
import { Contains } from '../tileposition/Contains'


export let IsOverlappingPoint = function (
    board: ILogicBoard,
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