import { ITable, SortMode, SortModeString, SortCallback } from './ITable';
import { HasRowKey, HasColKey } from './Get';
import { GetKey } from './MapKey';

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

        let data = table.data;
        sortCallback = function (colKeyA: string, colKeyB: string) {
            let valA = data.get(GetKey(rowKey, colKeyA));
            let valB = data.get(GetKey(rowKey, colKeyB));
            let retVal: number;
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

        let data = table.data;
        sortCallback = function (rowKeyA: string, rowKeyB: string): number {
            let valA = data.get(GetKey(rowKeyA, colKey));
            let valB = data.get(GetKey(rowKeyB, colKey));
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
