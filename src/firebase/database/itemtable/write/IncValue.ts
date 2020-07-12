import { IItemTable } from '../IItemTable';
import { GetItemRef } from '../GetItemRef';


export let IncValue = function (
    itemTable: IItemTable
): Promise<any> {

    let key0: string,
        key1: string,
        key2: string,
        value: unknown;

    switch (arguments.length) {
        case 4:
            [key0, key1, key2, value] = arguments;
            break;
        case 3:
            [key0, key1, value] = arguments;
            break;
        case 2:
            [key0, value] = arguments;
            break;
        default:
            value = arguments[0];
            break;
    }

    return GetItemRef(itemTable, key0, key1, key2).transaction(function (preValue) {
        if (preValue === null) {
            preValue = 0;
        }
        return (preValue + value);
    });
}