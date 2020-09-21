import { SpliceOne } from './SpliceOne';

export function Remove<T>(
    array: T[],
    item: T,
    callback?: ((item: T) => void),
    context: unknown = array
) {

    //  Fast path to avoid array mutation and iteration
    if (!Array.isArray(item)) {
        const index = array.indexOf(item);

        if (index !== -1) {
            SpliceOne(array, index);

            if (callback) {
                callback.call(context, item);
            }

            return item;
        }
        else {
            return null;
        }
    }

    //  If we got this far, we have an array of items to remove

    let itemLength = item.length - 1;

    while (itemLength >= 0) {
        const entry = item[itemLength];

        const index = array.indexOf(entry);

        if (index !== -1) {
            SpliceOne(array, index);

            if (callback) {
                callback.call(context, entry);
            }
        }
        else {
            //  Item wasn't found in the array, so remove it from our return results
            item.pop();
        }

        itemLength--;
    }

    return item;
};