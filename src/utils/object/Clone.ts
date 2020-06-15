import Clear from './Clear';

/**
 * Clone all items of an array, or all properties of an object
 *
 * @param {(any[] | { [name: string]: any })} obj
 * @param {(any[] | { [name: string]: any })} [out]
 * @returns {(any[] | { [name: string]: any })}
 */
export default function Clone(
    obj: any[] | { [name: string]: any },
    out?: any[] | { [name: string]: any }
): any[] | { [name: string]: any } {

    var objIsArray = Array.isArray(obj);

    if (out === undefined) {
        out = (objIsArray) ? [] : {};
    } else {
        Clear(out);
    }

    if (objIsArray) {
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
