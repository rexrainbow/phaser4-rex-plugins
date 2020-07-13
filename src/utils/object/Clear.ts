/**
 * Clear all items of an array, or all properties of an object
 *
 * @param {(any[] | { [name: string]: any })} obj
 */
export function Clear(
    obj: any[] | { [name: string]: any }
): void {

    if (Array.isArray(obj)) {
        obj.length = 0;
    } else {
        for (let key in obj) {
            delete obj[key];
        }
    }

}