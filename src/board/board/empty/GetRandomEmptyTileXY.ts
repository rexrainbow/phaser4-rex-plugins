import { IBaseBoard } from '../IBaseBoard';
import { XType, YType, ZType, XYType } from '../../types';
import { TileXYZToChess } from '../tileposition/TileXYZToChess';
import { GetEmptyTileXYArray } from './GetEmptyTileXYArray';
import { RandomInt } from '../../../utils/math/RandomInt';
import { GetRandomItem } from '../../../utils/array/GetRandom';

export let GetRandomEmptyTileXY = function (
    board: IBaseBoard,
    tileZ: ZType = 0,
    out: XYType | true = { x: 0, y: 0 }
): XYType | null {

    if (out === true) {
        out = globTileXY;
    }

    // Random picking a tileXY
    let retryCount = Math.floor(board.width * board.height * 0.3);
    for (let i = 0; i < retryCount; i++) {
        let tileX = RandomInt(0, board.width - 1) as XType;
        let tileY = RandomInt(0, board.height - 1) as YType;
        if (TileXYZToChess(board, tileX, tileY, tileZ) === null) {
            out.x = tileX;
            out.y = tileY;
            return out;
        }
    }

    // Not found any empty tileXY
    // Get all empty tileXY
    let tileXYArray = GetEmptyTileXYArray(board, tileZ);
    if (tileXYArray.length === 0) {
        return null;
    } else {
        let tileXY: XYType = GetRandomItem(tileXYArray);
        out.x = tileXY.x;
        out.y = tileXY.y;
        return out;
    }
}

let globTileXY: XYType = { x: 0, y: 0 };