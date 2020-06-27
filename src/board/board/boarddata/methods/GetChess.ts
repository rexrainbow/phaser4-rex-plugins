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
): IChess | ZMapType {
    let zMap = boardData.XYToZMap.get(GetXYKey(x, y));
    return (z !== undefined) ? zMap.get(z) : zMap;
}