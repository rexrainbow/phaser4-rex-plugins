import { Stack } from '../struct/Stack';

let globEmptyMapPool = new Stack();

export let GetEmptyMap = function (): Map<any, any> {
    let newMap = globEmptyMapPool.pop();
    if (newMap === null) {
        newMap = new Map();
    }
    return newMap;
}

export let FreeEmptyMap = function (map: Map<any, any>): void {
    globEmptyMapPool.push(map);
}

export let FreeEmptyMaps = function (maps: Map<any, any>[]): void {
    globEmptyMapPool.pushMultiple(maps);
}