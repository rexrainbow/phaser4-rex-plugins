import { ITable, CellValueCallbackType } from './ITable';
import { GetKey } from './MapKey';
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

    let data = table.data;
    table.colKeys.forEach(function (colKey) {
        let key = GetKey(rowKey, colKey);
        let value = data.get(key);

        if (scope) {
            value = callback.call(scope, value, rowKey, colKey, table);
        } else {
            value = callback(value, rowKey, colKey, table);
        }

        data.set(key, value);
    })
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
    table.rowKeys.forEach(function (rowKey) {
        let key = GetKey(rowKey, colKey);
        let value = data.get(key);

        if (scope) {
            value = callback.call(scope, value, rowKey, colKey, table);
        } else {
            value = callback(value, rowKey, colKey, table);
        }

        data.set(key, value);
    })
}
