import {
    ILogicBoard,
    ZType, XYType
} from '../ILogicBoard';

export let GetEmptyTileXYArray = function (
    board: ILogicBoard,
    tileZ: ZType = 0,
    out: XYType[] = []
): XYType[] {

    for (let tileY = 0; tileY < board.height; tileY++) {
        for (let tileX = 0; tileX < board.width; tileX++) {
            if (board.tileXYZToChess(tileX, tileY, tileZ) === null) {
                out.push({
                    x: tileX,
                    y: tileY
                });
            }
        }
    }
    return out;
}