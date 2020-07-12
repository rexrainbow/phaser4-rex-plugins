export let Copy = function<T> (
    dest: any[],
    src: T[],
    startIdx: number = 0,
    endIdx: number = src.length
): T[] {

    dest.length = endIdx - startIdx;
    for (let i = 0, cnt = dest.length; i < cnt; i++) {
        dest[i] = src[i + startIdx];
    }
    return dest;
};