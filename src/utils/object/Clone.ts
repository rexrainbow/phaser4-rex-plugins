import { Clear } from './Clear';

export function Clone(
    obj: any[] | { [name: string]: any },
    out: any[] | { [name: string]: any } = ((Array.isArray(obj))? [] : {})
): any[] | { [name: string]: any } {

    Clear(out);
    if (Array.isArray(obj)) {
        out.length = obj.length;
        for (let i = 0, cnt = obj.length; i < cnt; i++) {
            out[i] = obj[i];
        }
    } else {
        for (let key in obj) {
            out[key] = obj[key];
        }
    }

    return out;
};
