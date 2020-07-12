export let DeepClone = function <T>(
    obj: T,
): T {

    return JSON.parse(JSON.stringify(obj));
}