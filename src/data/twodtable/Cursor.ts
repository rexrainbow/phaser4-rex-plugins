import { ITable } from './ITable';

export let SetCursor = function (
    table: ITable,
    rowKey: string = '',
    colKey: string = ''
): void {

    table.cursor.rowKey = rowKey;
    table.cursor.colKey = colKey;
}