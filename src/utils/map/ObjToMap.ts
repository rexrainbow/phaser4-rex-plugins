export function ObjToMap(
    obj: { [name: string]: any },
    out: Map<string, any> = new Map
): Map<string, any> {

    for (let key in obj) {
        out.set(key, obj[key]);
    }
    return out;
}