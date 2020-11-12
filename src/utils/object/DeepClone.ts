export function DeepClone<T>(
    inObject: T,
): T {

    if ((typeof inObject !== 'object') || (inObject === null)) {
        //  inObject is not an object
        return inObject;
    }

    //  Create an array or object to hold the values
    const outObject = (Array.isArray(inObject) ? [] : {}) as T;

    for (const key in inObject) {
        const value = inObject[key];

        //  Recursively (deep) copy for nested objects, including arrays
        outObject[key] = DeepClone(value);
    }

    return outObject;
}