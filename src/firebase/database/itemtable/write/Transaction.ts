import { IItemTable } from '../IItemTable';
import { GetItemRef } from '../GetItemRef';
import { TransactionCallbackType } from '../Types';


export var Transaction = function (
    itemTable: IItemTable,
    ...args: [TransactionCallbackType] |
        [string, TransactionCallbackType] |
        [string, string, TransactionCallbackType] |
        [string, string, string, TransactionCallbackType]
): Promise<any> {

    let key0: string,
        key1: string,
        key2: string,
        callback: TransactionCallbackType;

    switch (args.length) {
        case 4:
            [key0, key1, key2, callback] = args;
            break;
        case 3:
            [key0, key1, callback] = args;
            break;
        case 2:
            [key0, callback] = args;
            break;
        default:
            callback = args[0];
            break;
    }

    // callback: function(preValue) { return newValue; }
    return GetItemRef(itemTable, key0, key1, key2).transaction(callback);
}