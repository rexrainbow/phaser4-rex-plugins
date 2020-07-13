import { IBaseBoard } from '../IBaseBoard';
import { XYType, Vec2Type } from '../../Types';
import { TileXYToWorldXY } from './TileXYToWorldXY';

export function TileXYArrayToWorldXYArray(
    board: IBaseBoard,
    tileXYArray: XYType[],
    out: Vec2Type[] = []
): Vec2Type[] {

    for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
        let tileXY = tileXYArray[i];
        out.push(TileXYToWorldXY(board, tileXY.x, tileXY.y));
    }
    return out;
};