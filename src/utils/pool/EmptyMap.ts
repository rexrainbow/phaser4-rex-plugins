import { Stack } from '../struct/Stack';

type T = Map<any, any>;
let globEmptyMapPool = new Stack<T>();

export function GetEmptyMap(

): T {

    let newMap = globEmptyMapPool.pop();
    if (newMap === null) {
        newMap = new Map();
    }
    return newMap;
}

export function FreeEmptyMap(
    map: T
): void {

    globEmptyMapPool.push(map);
}

export function FreeEmptyMaps(
    maps: T[]
): void {

    globEmptyMapPool.pushMultiple(maps);
}