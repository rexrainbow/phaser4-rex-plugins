import { IItemTable } from '../IItemTable';
import { GetItemRef } from '../GetItemRef';


export let SetData = function (
    itemTable: IItemTable,
    ...args: [unknown] | [string, unknown] | [string, string, unknown] | [string, string, string, unknown]
): Promise<any> {

    let key0: string,
        key1: string,
        key2: string,
        value: unknown;

    switch (args.length) {
        case 4:
            [key0, key1, key2, value] = args;
            break;
        case 3:
            [key0, key1, value] = args;
            break;
        case 2:
            [key0, value] = args;
            break;
        default:
            value = args[0];
            break;
    }

    return GetItemRef(itemTable, key0, key1, key2).set(value);
}