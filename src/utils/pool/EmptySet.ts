import { Stack } from '../struct/Stack';

var globEmptySetPool = new Stack();

export let GetEmptySet = function (): Set<any> {
    let newMap = globEmptySetPool.pop();
    if (newMap === null) {
        newMap = new Set();
    }
    return newMap;
}

export let FreeEmptySet = function (map: Set<any>): void {
    globEmptySetPool.push(map);
}

export let FreeEmptySets = function (maps: Set<any>[]): void {
    globEmptySetPool.pushMultiple(maps);
}