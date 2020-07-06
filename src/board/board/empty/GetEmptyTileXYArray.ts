import { IBoardBase } from '../IBoardBase';
import { ZType, XYType } from '../../types';
import { TileXYZToChess } from '../tileposition/TileXYZToChess';

export let GetEmptyTileXYArray = function (
    board: IBoardBase,
    tileZ: ZType | ZType[] = 0,
    out: XYType[] = []
): XYType[] {

    if (!Array.isArray(tileZ)) {
        for (let tileY = 0; tileY < board.height; tileY++) {
            for (let tileX = 0; tileX < board.width; tileX++) {
                if (TileXYZToChess(board, tileX, tileY, tileZ) === null) {
                    out.push({
                        x: tileX,
                        y: tileY
                    });
                }
            }
        }
    } else {
        let tileZArray = tileZ;
        for (let tileY = 0; tileY < board.height; tileY++) {
            for (let tileX = 0; tileX < board.width; tileX++) {
                let isEmpty = true;
                for (let k = 0, kcnt = tileZArray.length; k < kcnt; k++) {
                    if (TileXYZToChess(board, tileX, tileY, tileZArray[k]) !== null) {
                        isEmpty = false;
                        break;
                    }
                }
                if (isEmpty) {
                    out.push({
                        x: tileX,
                        y: tileY
                    });
                }
            }
        }
    }
    return out;
}