import { Stack } from '../struct/Stack';

let globEmptySetPool = new Stack();

export function GetEmptySet(

): Set<any> {

    let newSet = globEmptySetPool.pop();
    if (newSet === null) {
        newSet = new Set();
    }
    return newSet;
}

export function FreeEmptySet(
    set: Set<any>
): void {

    globEmptySetPool.push(set);
}

export function FreeEmptySets(
    sets: Set<any>[]
): void {

    globEmptySetPool.pushMultiple(sets);
}