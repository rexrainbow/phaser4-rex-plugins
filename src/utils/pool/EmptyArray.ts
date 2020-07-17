import { Stack } from '../struct/Stack';

type T = any[];
let globEmptyArrayPool = new Stack<T>();

export function GetEmptyArray(

): T {

    let newArray = globEmptyArrayPool.pop();
    if (newArray === null) {
        newArray = [];
    }
    return newArray;
}

export function FreeEmptyArray(
    arr: T
): void {

    globEmptyArrayPool.push(arr);
}

export function FreeEmptyArrays(
    arrs: T[]
): void {

    globEmptyArrayPool.pushMultiple(arrs);
}