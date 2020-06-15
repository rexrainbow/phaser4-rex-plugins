export type RowType = { [colKey: string]: any };

export type DataType = {
    [rowKey: string]: RowType
};

export type KeyType = string[];

export type CursorType = {
    colKey: string,
    rowKey: string
};

export interface ITable {
    data: DataType;
    rowKeys: KeyType;
    colKeys: KeyType;
    cursor: CursorType;
}