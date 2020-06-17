import { ITable } from "./ITable";
import { HasRowKey, HasColKey } from './Get';

export function IsValueInRow(
    table: ITable,
    rowKey: string,
    value: any
): boolean {

    if (!HasRowKey(table, rowKey)) {
        return false;
    }

    let row = table.data[rowKey];
    let colKeys = table.colKeys,
        colKey: string;
    for (let i = 0, cnt = colKeys.length; i < cnt; i++) {
        colKey = colKeys[i];
        if (row[colKey] === value) {
            return true;
        }
    }

    return false;
}

export function IsValueInCol(
    table: ITable,
    colKey: string,
    value: any
): boolean {

    if (!HasColKey(table, colKey)) {
        return false;
    }

    let data = table.data;
    let rowKeys = table.rowKeys,
        rowKey: string;
    for (let i = 0, cnt = rowKeys.length; i < cnt; i++) {
        if (data[rowKey][colKey] === value) {
            return true;
        }
    }

    return false;
}
