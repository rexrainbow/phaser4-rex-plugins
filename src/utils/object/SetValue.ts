type KeyType = string | string[] | null | undefined;
type DictType = { [key: string]: any };

function IsInValidKey(keys: KeyType): boolean {
    return (keys == null) || (keys === '') || (keys.length === 0);
};

function GetEntry(
    target: any,
    keys: KeyType,
    defaultEntry = {}
): DictType {

    let entry = target;
    if (IsInValidKey(keys)) {
        //entry = root;
    } else {
        if (typeof (keys) === 'string') {
            keys = keys.split('.');
        }

        let key: string;
        for (let i = 0, cnt = keys.length; i < cnt; i++) {
            key = keys[i];
            if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
                let newEntry: DictType;
                if (i === cnt - 1) {
                    newEntry = defaultEntry;
                } else {
                    newEntry = {};
                }

                entry[key] = newEntry;
            }

            entry = entry[key];
        }
    }

    return entry;
};

export function SetValue(
    target: any,
    keys: KeyType,
    value: any
): void {

    // Not an object
    if (typeof (target) !== 'object') {
        return;
    }

    // Invalid key
    else if (IsInValidKey(keys)) {
        // Don't erase target
        if (value == null) {
            return;
        } else if (typeof (value) === 'object') { // Override target to another object
            target = value;
        }
    } else {
        if (typeof (keys) === 'string') {
            keys = keys.split('.');
        }

        let lastKey = keys.pop();
        let entry = GetEntry(target, keys);
        entry[lastKey] = value;
    }

    return target;
};