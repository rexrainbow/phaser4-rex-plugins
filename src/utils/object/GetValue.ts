/**
 * Retrieves a value from an object.
 *
 * @param {*} source
 * @param {string} key
 * @param {*} defaultValue
 * @returns
 */
export let GetValue = function (
    source: any,
    key: string,
    defaultValue: any
) {

    if (!source || typeof source !== 'object') {
        return defaultValue;

    } else if (source.hasOwnProperty(key)) {
        return source[key];

    } else if (key.indexOf('.') !== -1) {
        let keys = key.split('.');
        let parent = source;
        let value = defaultValue;

        //  Use for loop here so we can break early
        for (let i = 0, cnt = keys.length; i < cnt; i++) {
            if (parent.hasOwnProperty(keys[i])) {
                //  Yes it has a key property, let's carry on down
                value = parent[keys[i]];

                parent = parent[keys[i]];
            }
            else {
                //  Can't go any further, so reset to default
                value = defaultValue;
                break;
            }
        }

        return value;

    } else {

        return defaultValue;
    }
};