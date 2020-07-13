import { ITable, AppendCallbackType } from './ITable';
import { HasRowKey, HasColKey } from './Get';
import { GetKey } from './MapKey';

export function AppendRow(
    table: ITable,
    rowKey: string,
    callback: AppendCallbackType | any = 0,
    scope?: unknown
): void {

    if (HasRowKey(table, rowKey)) {
        return;
    }

    let isCallbackMode = (typeof (callback) === 'function');
    let initValue = (isCallbackMode) ? undefined : callback;

    table.rowKeys.push(rowKey);

    let data = table.data;
    table.colKeys.forEach(function (colKey) {
        let key = GetKey(rowKey, colKey);
        let value: any;
        if (isCallbackMode) {
            if (scope) {
                value = callback.call(scope, table, rowKey, colKey);
            } else {
                value = callback(table, rowKey, colKey)
            }
        } else {
            value = initValue;
        }

        data.set(key, value);
    })
}

export function AppendCol(
    table: ITable,
    colKey: string,
    callback: AppendCallbackType | any = 0,
    scope?: unknown
): void {

    if (HasColKey(table, colKey)) {
        return;
    }

    let isCallbackMode = (typeof (callback) === 'function');
    let initValue = (isCallbackMode) ? undefined : callback;

    table.colKeys.push(colKey);


    let data = table.data;
    table.rowKeys.forEach(function (rowKey) {
        let key = GetKey(rowKey, colKey);
        let value: any;
        if (isCallbackMode) {
            if (scope) {
                value = callback.call(scope, table, rowKey, colKey);
            } else {
                value = callback(table, rowKey, colKey)
            }
        } else {
            value = initValue;
        }

        data.set(key, value);
    })
}