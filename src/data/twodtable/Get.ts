import { ITable } from './ITable';
import { GetKey } from './MapKey';

export function Get(
    table: ITable,
    rowKey: string,
    colKey: string
): any {

    return table.data.get(GetKey(rowKey, colKey));
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