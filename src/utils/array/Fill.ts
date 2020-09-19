export function Fill<T>(
    array: T[],
    value: T,
    startIndex: number = 0,
    endIndex: number = array.length - 1
) {

    for (let i = startIndex; i <= endIndex; i++) {
        array[i] = value;
    }
    return array;
}