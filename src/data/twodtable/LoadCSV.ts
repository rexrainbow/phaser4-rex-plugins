import { ITable, ILoadCSVConfig, CellValueCallbackType } from './ITable';
import { DefaultTypeConvert } from './TypeConvert';
import { CSVParser } from '../../utils/string/papaparse';
import { Clear } from './Remove';
import { Copy as ArrayCopy } from '../../utils/array/Copy';
import { GetKey } from './MapKey';

export let LoadCSV = function (
    table: ITable,
    csvString: string,
    config?: ILoadCSVConfig
): void {

    let delimiter: string,
        convert: boolean,
        convertCallback: CellValueCallbackType | undefined,
        convertScope: object | undefined;
    ({
        delimiter = ',',
        convert = true,
        convertCallback = DefaultTypeConvert,
        convertScope = undefined
    } = config || {})
    if (!convert) {
        convertCallback = undefined;
    }

    Clear(table);

    let arr: any[] = CSVParser.parse(csvString, {
        delimiter: delimiter
    }).data;

    table.colKeys = ArrayCopy(table.colKeys, arr[0]);
    table.rowKeys.length = arr.length - 1;
    for (let i = 0, cnt = table.rowKeys.length; i < cnt; i++) {
        table.rowKeys[i] = arr[i + 1][0]; // skip 1st row
    }

    let colKeys = table.colKeys,
        rowKeys = table.rowKeys;
    let data = table.data;
    let colKey: string,
        rowKey: string,
        value: any;
    for (let r = 0, rcnt = rowKeys.length; r < rcnt; r++) {
        rowKey = rowKeys[r];

        for (let c = 0, ccnt = colKeys.length; c < ccnt; c++) {
            colKey = colKeys[c];
            value = arr[r + 1][c];

            if (convertCallback) {
                if (convertScope) {
                    value = convertCallback.call(convertScope, value, rowKey, colKey, table);
                } else {
                    value = convertCallback(value, rowKey, colKey, table);
                }
            }

            data.set(GetKey(rowKey, colKey), value);
        }
    }
}