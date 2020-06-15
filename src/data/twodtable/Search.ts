import { ITable } from "./ITable";

export function IsValueInRow(
    table: ITable,
    rowKey: string,
    value: any
): boolean {

    if (table.rowKeys.indexOf(rowKey) === -1) {
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

    if (table.colKeys.indexOf(colKey) === -1) {
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
