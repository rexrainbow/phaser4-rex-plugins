import { ITable } from './ITable';
import { GetKey } from './MapKey';

export let Get = function (
    table: ITable,
    rowKey: string,
    colKey: string
): unknown {

    return table.data.get(GetKey(rowKey, colKey));
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