import { Stack } from '../struct/Stack';

let globEmptyMapPool = new Stack();

export function GetEmptyMap(

): Map<any, any> {

    let newMap = globEmptyMapPool.pop();
    if (newMap === null) {
        newMap = new Map();
    }
    return newMap;
}

export function FreeEmptyMap(
    map: Map<any, any>
): void {

    globEmptyMapPool.push(map);
}

export function FreeEmptyMaps(
    maps: Map<any, any>[]
): void {

    globEmptyMapPool.pushMultiple(maps);
}