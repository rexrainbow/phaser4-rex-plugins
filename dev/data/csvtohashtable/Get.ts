import { ITable } from './ITable';

let Get = function (
    table: ITable,
    rowKey: string,
    colKey: string
): any {

    let value: any;
    let data = table.data;
    if (data.hasOwnProperty(rowKey)) {
        let row = data[rowKey];
        if (row.hasOwnProperty(colKey)) {
            value = row[colKey];
        }
    }

    this.setCursor(rowKey, colKey);
    return value;
}

export { Get };