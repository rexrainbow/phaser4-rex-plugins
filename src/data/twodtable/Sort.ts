import { ITable } from './ITable';
import { Get } from './Get';

export enum SortMode {
    ascending = 0,
    descending = 1,
    logical_ascending = 2,
    logical_descending = 3
}
export type SortModeString = 'ascending' | 'descending' | 'logical_ascending' | 'logical_descending';
export type SortCallback = (keyA: string, keyB: string) => number;

export function SortCol(
    table: ITable,
    callback: SortCallback | string,
    scope?: object | SortMode | SortModeString
): void {

    let sortCallback: SortCallback;
    if (typeof (callback) === 'function') {
        if (scope) {
            sortCallback = callback.bind(scope);
        } else {
            sortCallback = callback;
        }
    } else {
        let colKey = callback;
        if (!this.hasRowKey(colKey)) {
            return;
        }

        let mode = scope;
        if (typeof (mode) === 'string') {
            mode = SortMode[mode] as number;
        }

        sortCallback = function (rowKeyA: string, rowKeyB: string): number {
            let valA = Get(table, rowKeyA, colKey);
            let valB = Get(table, rowKeyB, colKey);
            let retVal: any;
            if ((mode === SortMode.logical_ascending) || (mode === SortMode.logical_descending)) {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            }
            switch (mode) {
                case SortMode.ascending:
                case SortMode.logical_ascending:
                    retVal = (valA > valB) ? 1 :
                        (valA < valB) ? -1 : 0;
                    break;

                case SortMode.descending:
                case SortMode.logical_descending:
                    retVal = (valA < valB) ? 1 :
                        (valA > valB) ? -1 : 0;
                    break;
            }
            return retVal;
        };
    }

    table.rowKeys.sort(sortCallback);
}

export function SortRow(
    table: ITable,
    callback: SortCallback | string,
    scope?: object | SortMode | SortModeString
): void {

    let sortCallback: SortCallback;
    if (typeof (callback) === 'function') {
        if (scope) {
            sortCallback = callback.bind(scope);
        } else {
            sortCallback = callback;
        }
    } else {
        let rowKey = callback;
        if (!this.hasRowKey(rowKey)) {
            return;
        }
        let mode = scope as SortMode | SortModeString;
        if (typeof (mode) === 'string') {
            mode = SortMode[mode] as number;
        }

        sortCallback = function (colKeyA: string, colKeyB: string) {
            let valA = Get(table, colKeyA, colKeyB);
            let valB = Get(table, colKeyA, colKeyB);
            let retVal: any;
            if ((mode === SortMode.logical_ascending) || (mode === SortMode.logical_descending)) {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            }
            switch (mode) {
                case SortMode.ascending:
                case SortMode.logical_ascending:
                    retVal = (valA > valB) ? 1 :
                        (valA < valB) ? -1 : 0;
                    break;

                case SortMode.descending:
                case SortMode.logical_descending:
                    retVal = (valA < valB) ? 1 :
                        (valA > valB) ? -1 : 0;
                    break;
            }
            return retVal;
        }
    }

    table.colKeys.sort(sortCallback);
}