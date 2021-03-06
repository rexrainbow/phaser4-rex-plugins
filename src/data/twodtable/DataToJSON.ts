import { ITable, JSONDataType } from './ITable';
import { GetKey } from './MapKey';

export function DataToJSON(
    table: ITable
): JSONDataType {

    let obj: JSONDataType = {};
    let data = table.data;
    let rowKeys = table.rowKeys,
        colKeys = table.colKeys;
    rowKeys.forEach(function (rowKey) {
        let row: { [key: string]: any } = {};
        obj[rowKey] = row;
        colKeys.forEach(function (colKey) {
            row[colKey] = data.get(GetKey(rowKey, colKey));
        })
    })

    return obj;
}