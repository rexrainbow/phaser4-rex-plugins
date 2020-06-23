import { ITable, RowType, CellValueCallbackType } from './ITable';
import { DefaultTypeConvert } from './TypeConvert';
import { HasRowKey, HasColKey } from './Get';

export let ConvertRow = function (
    table: ITable,
    rowKey: string | string[],
    callback: CellValueCallbackType = DefaultTypeConvert,
    scope?: object
): void {

    if (Array.isArray(rowKey)) {
        for (let i = 0, cnt = rowKey.length; i < cnt; i++) {
            ConvertRow(table, rowKey[i], callback, scope);
        }
        return;
    }

    if (!HasRowKey(table, rowKey)) {
        return;
    }

    let row = table.data[rowKey];
    let colKeys = table.colKeys,
        colKey: string,
        value: any;
    for (let c = 0, ccnt = colKeys.length; c < ccnt; c++) {
        colKey = colKeys[c];
        value = row[colKey];
        if (scope) {
            value = callback.call(scope, value, rowKey, colKey, table);
        } else {
            value = callback(value, rowKey, colKey, table);
        }

        row[colKey] = value;
    }
}

export let ConvertCol = function (
    table: ITable,
    colKey: string | string[],
    callback: CellValueCallbackType = DefaultTypeConvert,
    scope?: object
): void {

    if (Array.isArray(colKey)) {
        for (let i = 0, cnt = colKey.length; i < cnt; i++) {
            ConvertCol(table, colKey[i], callback, scope)
        }
        return;
    }

    if (!HasColKey(table, colKey)) {
        return;
    }

    let data = table.data;
    let row: RowType,
        rowKeys = table.rowKeys,
        rowKey: string,
        value: any;
    for (let r = 0, rcnt = rowKeys.length; r < rcnt; r++) {
        rowKey = rowKeys[r];
        row = data[rowKey];
        value = row[colKey];
        if (scope) {
            value = callback.call(scope, value, rowKey, colKey, table);
        } else {
            value = callback(value, rowKey, colKey, table);
        }

        row[colKey] = value;
    }
}
