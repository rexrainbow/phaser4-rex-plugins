import { ITable, AppendCallbackType } from './ITable';
import { HasRowKey, HasColKey } from './Get';

export let AppendRow = function (
    table: ITable,
    rowKey: string,
    callback: AppendCallbackType | any = 0,
    scope?: object
): void {

    if (!HasRowKey(table, rowKey)) {
        return;
    }

    let isCallbackMode = (typeof (callback) === 'function');
    let initValue = (isCallbackMode) ? undefined : callback;

    table.rowKeys.push(rowKey);
    let row = {};
    table.data[rowKey] = row;
    let colKeys = table.colKeys,
        colKey: string,
        value: any;
    for (let i = 0, cnt = colKeys.length; i < cnt; i++) {
        colKey = colKeys[i];
        if (isCallbackMode) {
            if (scope) {
                value = callback.call(scope, table, rowKey, colKey);
            } else {
                value = callback(table, rowKey, colKey)
            }
        } else {
            value = initValue;
        }
        row[colKey] = value;
    }
}

export let AppendCol = function (
    table: ITable,
    colKey: string,
    callback: AppendCallbackType | any = 0,
    scope?: object
): void {

    if (!HasColKey(table, colKey)) {
        return;
    }

    let isCallbackMode = (typeof (callback) === 'function');
    let initValue = (isCallbackMode) ? undefined : callback;

    table.colKeys.push(colKey);
    let data = table.data;
    let rowKeys = table.rowKeys,
        rowKey: string,
        value: any;
    for (let i = 0, cnt = rowKeys.length; i < cnt; i++) {
        rowKey = rowKeys[i];

        if (isCallbackMode) {
            if (scope) {
                value = callback.call(scope, table, rowKey, colKey);
            } else {
                value = callback(table, rowKey, colKey);
            }
        } else {
            value = initValue;
        }
        data[rowKey][colKey] = value;
    }
}