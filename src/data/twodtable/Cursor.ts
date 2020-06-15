import { ITable } from './ITable';

export function SetCursor(
    table: ITable,
    rowKey: string = '',
    colKey: string = ''
): void {

    table.cursor.rowKey = rowKey;
    table.cursor.colKey = colKey;
}