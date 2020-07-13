import { XType, YType, ZType, IChess, ZMapType } from '../../../Types';
import { XYToKey } from '../../../utils/StringKey';
import { FreeEmptyMap, GetEmptyMap } from '../../../../utils/pool/EmptyMap';

export let AddChessToZMap = function (
    chess: IChess,
    chessMap: Map<string, ZMapType>,
    prevX: XType | undefined,
    prevY: YType | undefined,
    prevZ: ZType | undefined,
    currX: XType | undefined,
    currY: YType | undefined,
    currZ: ZType | undefined
) {
    if ((prevX === currX) && (prevY === currY) && (prevZ === currZ)) {
        return;
    }
    let prevKey = XYToKey(prevX, prevY);
    let currKey = XYToKey(currX, currY);
    if (prevKey) {
        let zMap = chessMap.get(prevKey);
        zMap.delete(prevZ);
        if (prevKey === currKey) {
            zMap.set(currZ, chess);
            return;
        } else if (zMap.size === 0) {
            FreeEmptyMap(zMap); // Add to EmptyMap pool
            chessMap.delete(prevKey);
        }
    }
    if (currKey) {
        let zMap = chessMap.get(currKey);
        if (zMap) {
            zMap.set(currZ, chess);
        } else {
            zMap = GetEmptyMap(); // Request an empty map
            zMap.set(currZ, chess);
            chessMap.set(currKey, zMap);
        }
    }
}

export let RemoveChessFromZMap = function (
    chessMap: Map<string, ZMapType>,
    x: XType,
    y: YType,
    z?: ZType
) {
    let key = XYToKey(x, y);
    let zMap = chessMap.get(key);
    if (zMap) {
        if (z !== undefined) {
            zMap.delete(z);
            if (zMap.size === 0) {
                FreeEmptyMap(zMap); // Add to EmptyMap pool
                chessMap.delete(key);
            }
        } else {
            zMap.clear();
            FreeEmptyMap(zMap); // Add to EmptyMap pool
            chessMap.delete(key);
        }
    }
}