export default function Copy(
    dest: any[],
    src: any[],
    startIdx: number = 0,
    endIdx: number = src.length
): any[] {

    dest.length = endIdx - startIdx;
    for (let i = 0, cnt = dest.length; i < cnt; i++) {
        dest[i] = src[i + startIdx];
    }
    return dest;
};