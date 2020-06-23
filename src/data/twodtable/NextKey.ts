import { ITable } from './ITable';

export let NextColKey = function (
    table: ITable,
    colKey: string,
    step: number = 1,
    wrap: boolean = true
): string | undefined {

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

export let PreviousColKey = function (
    table: ITable,
    colKey: string,
    step: number = 1,
    wrap: boolean = true
): string | undefined {

    return NextColKey(table, colKey, -step, wrap);
}

export let NextRowKey = function (
    table: ITable,
    rowKey: string,
    step: number = 1,
    wrap: boolean = true
): string | undefined {

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

export let PreviousRowKey = function (
    table: ITable,
    rowKey: string,
    step: number = 1,
    wrap: boolean = true
): string | undefined {

    return NextRowKey(table, rowKey, -step, wrap);
}