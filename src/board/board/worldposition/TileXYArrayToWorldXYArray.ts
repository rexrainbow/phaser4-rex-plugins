import {
    ILogicBoard,
    XYType, Vec2Type
} from '../ILogicBoard';
import { TileXYToWorldXY } from './TileXYToWorldXY';

export let TileXYArrayToWorldXYArray = function (
    board: ILogicBoard,
    tileXYArray: XYType[],
    out: Vec2Type[] = []
): Vec2Type[] {

    for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        let tileXY = tileXYArray[i];
        out.push(TileXYToWorldXY(board, tileXY.x, tileXY.y));
    }
    return out;
};