import { ITable } from './ITable';
import { HasKey } from './Get';

export let Set = function (
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

export let Add = function (
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