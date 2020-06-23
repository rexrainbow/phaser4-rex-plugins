import { ITable } from './ITable';

export let Clear = function (
    table: ITable
) {
    let data = table.data;
    for (let key in data) {
        delete data[key];
    }
    table.rowKeys.length = 0;
    table.colKeys.length = 0;
}

export let RemoveRow = function (
    table: ITable,
    rowKey: string
): void {

    let idx = table.rowKeys.indexOf(rowKey);
    if (idx === -1) {
        return;
    }
    table.rowKeys.splice(idx, 1);
    delete table.data[rowKey];
}

export let RemoveCol = function (
    table: ITable,
    colKey: string
): void {

    let idx: number = table.colKeys.indexOf(colKey);
    if (idx === -1) {
        return;
    }
    table.colKeys.splice(idx, 1);

    let data = table.data;
    let rowKeys = table.rowKeys;
    for (let i = 0, cnt = rowKeys.length; i < cnt; i++) {
        delete data[rowKeys[i]][colKey];
    }
}
