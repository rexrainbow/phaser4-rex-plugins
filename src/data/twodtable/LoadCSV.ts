import { ITable, RowType, ILoadCSVConfig, CellValueCallbackType } from './ITable';
import { DefaultTypeConvert } from './TypeConvert';
import { CSVParser } from '../../utils/string/papaparse';
import { Clear } from './Remove';
import ArrayCopy from '../../utils/array/Copy';

export function LoadCSV(
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
        row: RowType,
        value: any;
    for (let r = 0, rcnt = rowKeys.length; r < rcnt; r++) {
        rowKey = rowKeys[r];
        row = {};
        data[rowKey] = row;
        for (let c = 0, ccnt = colKeys.length; c < ccnt; c++) {
            value = arr[r + 1][c];
            colKey = colKeys[c];

            if (convertCallback) {
                if (convertScope) {
                    value = convertCallback.call(convertScope, value, rowKey, colKey, table);
                } else {
                    value = convertCallback(value, rowKey, colKey, table);
                }
            }
            row[colKey] = value;
        }
    }
}