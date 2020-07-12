export let SpliceOne = function <T>(
    array: T[],
    index: number
): T {

    if (index >= array.length) {
        return;
    }

    let len = array.length - 1;
    let item = array[index];
    for (let i = index; i < len; i++) {
        array[i] = array[i + 1];
    }
    array.length = len;
    return item;
};
