import {
    IChess,
    XType, YType, ZType,
    ZMapType
} from '../IBoardData';
import { GetXYKey } from './Key';

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
    let prevKey = GetXYKey(prevX, prevY);
    let currKey = GetXYKey(currX, currY);
    if (prevKey) {
        let zMap = chessMap.get(prevKey);
        zMap.delete(prevZ);
        if (prevKey === currKey) {
            zMap.set(currZ, chess);
            return;
        } else if (zMap.size === 0) {
            chessMap.delete(prevKey);
        }
    }
    if (currKey) {
        let zMap = chessMap.get(currKey);
        if (zMap) {
            zMap.set(currZ, chess);
        } else {
            zMap = new Map();
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
    let key = GetXYKey(x, y);
    let zMap = chessMap.get(key);
    if (zMap) {
        if (z !== undefined) {
            zMap.delete(z);
            if (zMap.size === 0) {
                chessMap.delete(key);
            }
        } else {
            zMap.clear();
            chessMap.delete(key);
        }
    }
}