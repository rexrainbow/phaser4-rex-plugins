import { ITable } from './ITable';

export function NextColKey(
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

export function PreviousColKey(
    table: ITable,
    colKey: string,
    step: number = 1,
    wrap: boolean = true
): string | undefined {

    return NextColKey(table, colKey, -step, wrap);
}

export function NextRowKey(
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

export function PreviousRowKey(
    table: ITable,
    rowKey: string,
    step: number = 1,
    wrap: boolean = true
): string | undefined {

    return NextRowKey(table, rowKey, -step, wrap);
}