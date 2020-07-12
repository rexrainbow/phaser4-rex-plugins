import { IItemTable } from '../IItemTable';
import { GetItemRef } from '../GetItemRef';


export let RemoveDataOnDisconnect = function (
    itemTable: IItemTable
): Promise<any> {

    let key0: string,
        key1: string,
        key2: string;

    switch (arguments.length) {
        case 3:
            [key0, key1, key2] = arguments;
            break;
        case 2:
            [key0, key1] = arguments;
            break;
        case 1:
            key0 = arguments[0];
            break;
    }

    return GetItemRef(itemTable, key0, key1, key2).onDisconnect().remove();
}