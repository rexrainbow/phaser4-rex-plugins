import { ITable } from "./ITable";
import { HasRowKey, HasColKey } from './Get';
import { GetKey } from './MapKey';


export function IsValueInRow(
    table: ITable,
    rowKey: string,
    value: any
): boolean {

    if (!HasRowKey(table, rowKey)) {
        return false;
    }

    let found = false;
    let data = table.data;
    table.colKeys.forEach(function (colKey) {
        if (data.get(GetKey(rowKey, colKey)) === value) {
            found = true;
            return true; // Break forEach
        }
    })

    return found;
}

export function IsValueInCol(
    table: ITable,
    colKey: string,
    value: any
): boolean {

    if (!HasColKey(table, colKey)) {
        return false;
    }

    let found = false;
    let data = table.data;
    table.rowKeys.forEach(function (rowKey) {
        if (data.get(GetKey(rowKey, colKey)) === value) {
            found = true;
            return true; // Break forEach
        }
    })

    return found;
}
