export let GetMaxMapKey = function (map: Map<number, any>) {
    let result = -Infinity;
    for (const [key, item] of map) {
        if (result < key) {
            result = key;
        }
    }
    return result;
}

export let GetMinMapKey = function (map: Map<number, any>) {
    let result = Infinity;
    for (const [key, item] of map) {
        if (result > key) {
            result = key;
        }
    }
    return result;
}