import { ITable, EachKeyCallback } from './ITable';

export let EachRow = function (
    table: ITable,
    callback: EachKeyCallback,
    scope?: object
): void {

    let rowKeys = table.rowKeys,
        rowKey: string;
    for (let i = 0, cnt = rowKeys.length; i < cnt; i++) {
        rowKey = rowKeys[i];

        if (scope) {
            callback.call(scope, rowKey, table);
        } else {
            callback(rowKey, table);
        }
    }
}

export let EachCol = function (
    table: ITable,
    callback: EachKeyCallback,
    scope?: object
): void {

    let colKeys = table.colKeys,
        colKey: string;
    for (let i = 0, len = colKeys.length; i < len; i++) {
        colKey = colKeys[i];

        if (scope) {
            callback.call(scope, colKey, table);
        } else {
            callback(colKey, table);
        }
    }
}