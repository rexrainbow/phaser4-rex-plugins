import { Clone } from './Clone';

export function MergeRight<T>(
    src: T,
    override: { [name: string]: any },
    out?: { [name: string]: any }
): T {

    let result = Clone(src, out) as T;

    for (let key in override) {
        if (result.hasOwnProperty(key)) {
            result[key] = override[key];
        }
    }

    return result;
};