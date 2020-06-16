import { ITable } from './ITable';

export function Set(
    table: ITable,
    rowKey: string,
    colKey: string,
    value: any
): void {

    let data = table.data;
    if (data.hasOwnProperty(rowKey)) {
        let row = data[rowKey];
        if (row.hasOwnProperty(colKey)) {
            row[colKey] = value;
        }
    }
}

export function Add(
    table: ITable,
    rowKey: string,
    colKey: string,
    value: number = 1
): void {

    var data = table.data;
    if (data.hasOwnProperty(rowKey)) {
        var row = data[rowKey];
        if (row.hasOwnProperty(colKey)) {
            row[colKey] += value;
        }
    }
}