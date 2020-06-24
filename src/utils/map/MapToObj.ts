export let MapToObj = function (
    map: Map<string, any>,
    out: { [name: string]: any } = {}
): { [name: string]: any } {

    map.forEach((value, key) => (out[key] = value));
    return out;
}