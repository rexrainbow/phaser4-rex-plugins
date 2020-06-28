import {
    ILogicBoard,
    ZType
} from '../ILogicBoard';

export let IsOverlappingPoint = function (
    board: ILogicBoard,
    worldX: number,
    worldY: number,
    tileZ?: ZType
): boolean {

    if (board.infinityMode && (tileZ === undefined)) {
        return true;
    }

    let out = board.worldXYToTileXY(worldX, worldY, true);
    return board.contains(out.x, out.y, tileZ);
}