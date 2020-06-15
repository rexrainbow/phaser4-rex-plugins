import { ITable } from './ITable';

export function Get(
    table: ITable,
    rowKey: string,
    colKey: string
): any {

    let value: any = undefined;
    let data = table.data;
    if (data.hasOwnProperty(rowKey)) {
        let row = data[rowKey];
        if (row.hasOwnProperty(colKey)) {
            value = row[colKey];
        }
    }

    return value;
}

export function HasRowKey(
    table: ITable,
    rowKey: string
): boolean {

    return (table.rowKeys.indexOf(rowKey) !== -1);
}

export function HasColKey(
    table: ITable,
    colKey: string
): boolean {

    return (table.colKeys.indexOf(colKey) !== -1);
}

export function HasKey(
    table: ITable,
    rowKey: string,
    colKey: string
): boolean {

    return HasRowKey(table, rowKey) && HasColKey(table, colKey);
}