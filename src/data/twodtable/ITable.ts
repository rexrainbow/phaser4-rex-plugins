export type RowType = { [colKey: string]: any };

export type DataType = {
    [rowKey: string]: RowType
};

export type KeyType = string[];

export type CursorType = {
    colKey: string,
    rowKey: string
};

export type CellValueCallbackType = (value?: any, rowKey?: string, colKey?: string, table?: ITable) => any

export interface IConfig {
    data?: DataType;
    row?: KeyType;
    col?: KeyType;
    cursor?: CursorType;
}

export interface ILoadCSVConfig {
    delimiter?: string,
    convert?: boolean,
    convertCallback?: CellValueCallbackType,
    convertScope?: object
}

export interface ITable {
    data: DataType;
    rowKeys: KeyType;
    colKeys: KeyType;
    cursor: CursorType;
}