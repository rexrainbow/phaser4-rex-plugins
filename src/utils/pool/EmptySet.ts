import { Stack } from '../struct/Stack';

type T = Set<any>;
let globEmptySetPool = new Stack<T>();

export function GetEmptySet(

): T {

    let newSet = globEmptySetPool.pop();
    if (newSet === null) {
        newSet = new Set();
    }
    return newSet;
}

export function FreeEmptySet(
    set: T
): void {

    globEmptySetPool.push(set);
}

export function FreeEmptySets(
    sets: T[]
): void {

    globEmptySetPool.pushMultiple(sets);
}