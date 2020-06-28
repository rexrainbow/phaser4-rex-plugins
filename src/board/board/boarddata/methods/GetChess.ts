import {
    IBoardData,
    XType, YType, ZType,
    IChess, ZMapType
} from '../IBoardData';
import { GetXYKey } from './Key';

export let GetChess = function (
    boardData: IBoardData,
    x: XType,
    y: YType,
    z?: ZType
): IChess | ZMapType | null {
    let zMap = boardData.XYToZMap.get(GetXYKey(x, y));
    if (zMap === undefined) {
        return null;
    }

    if (z !== undefined) {
        return (zMap.has(z)) ? zMap.get(z) : null;
    } else {
        return zMap;
    }
}