import { IItemTable } from '../IItemTable';
import { GetItemRef } from '../GetItemRef';


export var Transaction = function (
    itemTable: IItemTable
): Promise<any> {

    let key0: string,
        key1: string,
        key2: string,
        callback: (preValue: any) => any;

    switch (arguments.length) {
        case 4:
            [key0, key1, key2, callback] = arguments;
            break;
        case 3:
            [key0, key1, callback] = arguments;
            break;
        case 2:
            [key0, callback] = arguments;
            break;
        default:
            callback = arguments[0];
            break;
    }

    // callback: function(preValue) { return newValue; }
    return GetItemRef(itemTable, key0, key1, key2).transaction(callback);
}