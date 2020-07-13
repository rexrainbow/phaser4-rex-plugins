import { IBoardData } from '../IBoardData';
import { XType, YType, ZType, IChess, ZMapType } from '../../../Types';
import { XYToKey } from '../../../utils/StringKey';

export let GetChess = function (
    boardData: IBoardData,
    x: XType,
    y: YType,
    z?: ZType
): IChess | ZMapType | null {
    let zMap = boardData.XYToZMap.get(XYToKey(x, y));
    if (zMap === undefined) {
        return null;
    }

    if (z !== undefined) {
        return (zMap.has(z)) ? zMap.get(z) : null;
    } else {
        return zMap;
    }
}