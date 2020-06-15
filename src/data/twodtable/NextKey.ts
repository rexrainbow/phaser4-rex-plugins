import { ITable } from './ITable';

export function NextColKey(
    table: ITable,
    colKey: string = table.cursor.colKey,
    step: number = 1,
    wrap: boolean = false
): string {

    let colKeys = table.colKeys;
    let idx = colKeys.indexOf(colKey);
    if (idx === -1) {
        return undefined;
    }
    idx += step;
    if (wrap) {
        idx = idx % colKeys.length;
    }
    return colKeys[idx];
}

export function PreviousColKey(
    table: ITable,
    colKey: string = table.cursor.colKey,
    step: number = 1,
    wrap: boolean = false
): string {

    return NextColKey(table, colKey, -step, wrap);
}

export function NextRowKey(
    table: ITable,
    rowKey: string = table.cursor.rowKey,
    step: number = 1,
    wrap: boolean = false
): string {

    let rowKeys = table.rowKeys;
    let idx = rowKeys.indexOf(rowKey);
    if (idx === -1) {
        return undefined;
    }
    idx += step;
    if (wrap) {
        idx = idx % rowKeys.length;
    }
    return rowKeys[idx];
}

export function PreviousRowKey(
    table: ITable,
    rowKey: string = table.cursor.rowKey,
    step: number = 1,
    wrap: boolean = false
): string {

    return NextRowKey(table, rowKey, -step, wrap);
}