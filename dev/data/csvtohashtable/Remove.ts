import { ITable } from './ITable';

let RemoveCol = function (
    table: ITable,
    colKey: string
): void {
    let idx: number = this.colKeys.indexOf(colKey);
    if (idx === -1) {
        return;
    }
    table.colKeys.splice(idx, 1);

    let table = this.table;
    let rowKeys = this.rowKeys;
    for (let i = 0, len = rowKeys.length; i < len; i++) {
        delete table[rowKeys[i]][colKey];
    }
}

let RemoveRow = function (
    table: ITable,
    rowKey: string
): void {
    let idx = this.rowKeys.indexOf(rowKey);
    if (idx === -1) {
        return;
    }
    table.rowKeys.splice(idx, 1);

    delete table.data[rowKey];
}



export { RemoveCol, RemoveRow };