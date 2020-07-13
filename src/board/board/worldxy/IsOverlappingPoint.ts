import { IBaseBoard } from '../IBaseBoard';
import { ZType } from '../../Types';
import { WorldXYToTileXY } from './WorldXYToTileXY';
import { Contains } from '../tilexy/Contains'

export function IsOverlappingPoint(
    board: IBaseBoard,
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