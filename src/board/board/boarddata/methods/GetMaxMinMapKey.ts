export function GetMaxMapKey(map: Map<number, any>) {
    let result = -Infinity;
    for (const [key, item] of map) {
        if (result < key) {
            result = key;
        }
    }
    return result;
}

export function GetMinMapKey(map: Map<number, any>) {
    let result = Infinity;
    for (const [key, item] of map) {
        if (result > key) {
            result = key;
        }
    }
    return result;
}