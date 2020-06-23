import { ITable } from './ITable';

export let Get = function (
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

export let HasRowKey = function (
    table: ITable,
    rowKey: string
): boolean {

    return (table.rowKeys.indexOf(rowKey) !== -1);
}

export let HasColKey = function (
    table: ITable,
    colKey: string
): boolean {

    return (table.colKeys.indexOf(colKey) !== -1);
}

export let HasKey = function (
    table: ITable,
    rowKey: string,
    colKey: string
): boolean {

    return HasRowKey(table, rowKey) && HasColKey(table, colKey);
}