import { ITable, RowType } from './ITable';
import { Get } from './Get';
import { CellCallbackType } from './IConfig';


export function EachRow(
    table: ITable,
    colKey: string | undefined | null,
    callback: CellCallbackType,
    scope?: object
): void {

    let isNullKey: boolean;
    if (typeof (colKey) === 'string') {
        isNullKey = false;
        if (table.colKeys.indexOf(colKey) === -1) {
            return;
        }
    } else {
        isNullKey = true;
    }

    let rowKeys = table.rowKeys,
        rowKey: string,
        value: any = undefined;
    for (let i = 0, cnt = rowKeys.length; i < cnt; i++) {
        rowKey = rowKeys[i];
        if (!isNullKey) {
            value = Get(table, rowKey, colKey);
        }

        if (scope) {
            callback.call(scope, value, rowKey, colKey, table);
        } else {
            callback(value, rowKey, colKey, table);
        }
    }
}

export function EachCol(
    table: ITable,
    rowKey: string,
    callback: CellCallbackType,
    scope?: object
): void {

    let isNullKey: boolean;
    let row: RowType | undefined = undefined;
    if (typeof (rowKey) === 'string') {
        isNullKey = false;
        if (table.rowKeys.indexOf(rowKey) === -1) {
            return;
        }
        row = table.data[rowKey];
    } else {
        isNullKey = true;
    }

    let colKeys = table.colKeys,
        colKey: string,
        value: any = undefined;
    for (let i = 0, len = colKeys.length; i < len; i++) {
        colKey = colKeys[i];
        if (!isNullKey) {
            value = row[colKey];
        }

        if (scope) {
            callback.call(scope, value, rowKey, colKey, table);
        } else {
            callback(value, rowKey, colKey, table);
        }
    }
}