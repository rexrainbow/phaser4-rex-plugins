/**
 * Is an array empty, or an object has no property?
 *
 * @param {(any[] | { [name: string]: any })} obj
 * @returns {boolean}
 */
export default function IsEmpty(
    obj: any[] | { [name: string]: any }
): boolean {

    if (Array.isArray(obj)) {
        return (obj.length === 0);
    } else {
        for (let k in obj) {
            return false;
        }
        return true;
    }
};