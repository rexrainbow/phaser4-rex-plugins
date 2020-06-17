import { ITable } from './ITable';
import { HasKey } from './Get';

export function Set(
    table: ITable,
    rowKey: string,
    colKey: string,
    value: any
): void {

    if (!HasKey(table, rowKey, colKey)) {
        return;
    }

    let data = table.data;
    if (!data.hasOwnProperty(rowKey)) {
        data[rowKey] = {};
    }
    data[rowKey][colKey] = value;
}

export function Add(
    table: ITable,
    rowKey: string,
    colKey: string,
    value: number = 1
): void {

    if (!HasKey(table, rowKey, colKey)) {
        return;
    }

    let data = table.data;
    if (!data.hasOwnProperty(rowKey)) {
        data[rowKey] = {};
    }
    let row = data[rowKey];
    if (!row.hasOwnProperty(colKey)) {
        row[colKey] = 0;
    }
    row[colKey] += value;
}