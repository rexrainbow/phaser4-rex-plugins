import { ITable } from './ITable';
import { GetKey } from './MapKey';

export function Clear(
    table: ITable
) {
    table.data.clear();
    table.rowKeys.length = 0;
    table.colKeys.length = 0;
}

export function RemoveRow(
    table: ITable,
    rowKey: string
): void {

    let idx = table.rowKeys.indexOf(rowKey);
    if (idx === -1) {
        return;
    }
    table.rowKeys.splice(idx, 1);

    table.colKeys.forEach(function (colKey) {
        table.data.delete(GetKey(rowKey, colKey));
    })
}

export function RemoveCol(
    table: ITable,
    colKey: string
): void {

    let idx: number = table.colKeys.indexOf(colKey);
    if (idx === -1) {
        return;
    }
    table.colKeys.splice(idx, 1);

    table.rowKeys.forEach(function (rowKey) {
        table.data.delete(GetKey(rowKey, colKey));
    })
}
