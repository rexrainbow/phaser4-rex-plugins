import { ITable, SortMode, SortModeString, SortCallback } from './ITable';
import { Get, HasRowKey, HasColKey } from './Get';

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
        if (!HasRowKey(table, rowKey)) {
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
        if (!HasColKey(table, colKey)) {
            return
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
