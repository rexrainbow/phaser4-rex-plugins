import { IItemTable } from '../IItemTable';
import { GetItemRef } from '../GetItemRef';


export let UpdateData = function (
    itemTable: IItemTable,
    data: object
): Promise<any> {

    return GetItemRef(itemTable).update(data);
}