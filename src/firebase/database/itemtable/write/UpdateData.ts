import { IItemTable } from '../IItemTable';
import { GetItemRef } from '../GetItemRef';


export function UpdateData(
    itemTable: IItemTable,
    data: object
): Promise<any> {

    return GetItemRef(itemTable).update(data);
}