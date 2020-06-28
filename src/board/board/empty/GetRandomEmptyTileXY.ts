import {
    ILogicBoard,
    XType, YType, ZType, XYType
} from '../ILogicBoard';
import { RandomInt } from '../../../utils/math/RandomInt';
import { GetRandomItem } from '../../../utils/array/GetRandom';

export let GetRandomEmptyTileXY = function (
    board: ILogicBoard,
    tileZ: ZType = 0,
    out: XYType | true = { x: 0, y: 0 }
): XYType | null {

    if (out === true) {
        out = globTileXY;
    }

    // Random picking a tileXY
    for(let i =0; i< 20; i++) {
        let tileX = RandomInt(0, board.width - 1) as XType;
        let tileY = RandomInt(0, board.height - 1) as YType;
        if (board.tileXYZToChess(tileX, tileY, tileZ) === null) {
            out.x = tileX;
            out.y = tileY;
            return out;
        }
    }

    // Not found any empty tileXY
    // Get all empty tileXY
    let tileXYArray = board.getEmptyTileXYArray(tileZ);
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