import { IItemTable } from '../IItemTable';
import { GetItemRef } from '../GetItemRef';


export function RemoveDataOnDisconnect(
    itemTable: IItemTable,
    ...args: [string] | [string, string] | [string, string, string]
): Promise<any> {

    let key0: string,
        key1: string,
        key2: string;

    switch (args.length) {
        case 3:
            [key0, key1, key2] = args;
            break;
        case 2:
            [key0, key1] = args;
            break;
        case 1:
            key0 = args[0];
            break;
    }

    return GetItemRef(itemTable, key0, key1, key2).onDisconnect().remove();
}