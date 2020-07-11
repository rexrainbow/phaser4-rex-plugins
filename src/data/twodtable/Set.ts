import { ITable } from './ITable';
import { HasKey } from './Get';
import { GetKey } from './MapKey';

export let Set = function (
    table: ITable,
    rowKey: string,
    colKey: string,
    value: any
): void {

    if (!HasKey(table, rowKey, colKey)) {
        return;
    }

    table.data.set(GetKey(rowKey, colKey), value);
}

export let Add = function (
    table: ITable,
    rowKey: string,
    colKey: string,
    value: number = 1
): void {

    if (!HasKey(table, rowKey, colKey)) {
        return;
    }

    let key = GetKey(rowKey, colKey);
    let data = table.data;
    let prevValue = data.get(key) || 0;
    data.set(key, prevValue + value);
}